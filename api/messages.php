<?php
require_once "cors.php";
require_once "db.php";

// SELF-HEALING: Ensure Table Exists
try {
    $conn->exec("CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_id INT,
        service_title VARCHAR(255),
        user_email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {}

// SELF-HEALING: Ensure service_category column exists
try {
    $check = $conn->query("SHOW COLUMNS FROM messages LIKE 'service_category'");
    if ($check->rowCount() == 0) {
        $conn->exec("ALTER TABLE messages ADD COLUMN service_category VARCHAR(100)");
    }
} catch (PDOException $e) {}

$method = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

try {
    switch ($method) {
        case 'GET':
            // Fetch all messages, ordered by newest first
            $sql = "SELECT * FROM messages ORDER BY created_at DESC";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($messages);
            break;

        case 'POST':
            // Create a new message
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($data['user_email']) || !isset($data['message'])) {
                throw new Exception("Missing required fields: user_email, message");
            }

            $service_id = $data['service_id'] ?? null;
            $service_title = $data['service_title'] ?? 'General Enquiry';
            $service_category = $data['service_category'] ?? 'General';
            $user_email = $data['user_email'];
            $message_content = $data['message'];

            $sql = "INSERT INTO messages (service_id, service_title, service_category, user_email, message) VALUES (:service_id, :service_title, :service_category, :user_email, :message)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                ':service_id' => $service_id,
                ':service_title' => $service_title,
                ':service_category' => $service_category,
                ':user_email' => $user_email,
                ':message' => $message_content
            ]);

            echo json_encode(['message' => 'Message sent successfully', 'id' => $conn->lastInsertId()]);
            break;

        case 'PUT':
            // Mark as read/unread or delete
            // Expecting query param or body. Let's support marking as read via ID in body or query.
            // Simplified: Expect ID and is_read in body
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? ($_GET['id'] ?? null);

            if (!$id) throw new Exception("ID required");

            if (isset($data['is_read'])) {
                $sql = "UPDATE messages SET is_read = :is_read WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->execute([':is_read' => $data['is_read'], ':id' => $id]);
                echo json_encode(['message' => 'Message status updated']);
            }
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $sql = "DELETE FROM messages WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->execute([':id' => $id]);
                echo json_encode(['message' => 'Message deleted']);
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
