<?php
require_once "cors.php";
require_once "db.php";

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password)) {
    try {
        // Check if table exists, if not create default admin
        $table_check = $conn->query("SHOW TABLES LIKE 'users'");
        if($table_check->rowCount() == 0) {
            $conn->exec("CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                password VARCHAR(255) NOT NULL
            )");
            // insert default admin: admin/admin123
            $default_pass = password_hash('admin123', PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES ('admin', ?)");
            $stmt->execute([$default_pass]);
        }

        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$data->username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if($user && password_verify($data->password, $user['password'])) {
            http_response_code(200);
            echo json_encode(array("token" => "mock-jwt-token-php-" . time()));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Invalid credentials"));
        }
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Login Error: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data"));
}
?>
