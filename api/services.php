<?php
require_once "cors.php";
require_once "db.php";

// SELF-HEALING: Ensure Table Exists (Simplified Schema)
try {
    $conn->exec("CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        detailedDescription TEXT,
        category VARCHAR(100),
        image VARCHAR(255),
        features TEXT,
        subservices TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {}

// SELF-HEALING: Ensure columns exist
$columns_to_check = [
    'detailedDescription' => 'TEXT',
    'features' => 'TEXT',
    'subservices' => 'TEXT'
];

foreach ($columns_to_check as $col => $type) {
    try {
        $check = $conn->query("SHOW COLUMNS FROM services LIKE '$col'");
        if ($check->rowCount() == 0) {
            $conn->exec("ALTER TABLE services ADD COLUMN $col $type");
        }
    } catch (PDOException $e) {}
}

$method = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

try {
    switch ($method) {
        case 'GET':
            $sql = "SELECT * FROM services ORDER BY created_at DESC";
            if(isset($_GET['id'])) {
                $sql = "SELECT * FROM services WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $_GET['id']);
            } else {
                $stmt = $conn->prepare($sql);
            }
            
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach($services as &$service) {
                 // Features decoding
                 if(isset($service['features']) && $service['features']) {
                     $decoded = json_decode($service['features'], true);
                     $service['features'] = (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) ? $decoded : explode(',', $service['features']);
                 } else {
                     $service['features'] = [];
                 }

                 // Subservices decoding
                 if(isset($service['subservices']) && $service['subservices']) {
                     $decoded = json_decode($service['subservices'], true);
                     $service['subservices'] = (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) ? $decoded : [];
                 } else {
                     $service['subservices'] = [];
                 }
                 
                 // Standardize defaults for frontend safely
                 $service['color'] = '#007bff'; // Always return a default color for frontend UI compatibility
            }
            
            if(isset($_GET['id'])) {
                 echo json_encode($services[0] ?? null);
            } else {
                 echo json_encode($services);
            }
            break;

        case 'POST':
            if (!isset($_POST['title'])) {
                throw new Exception("Missing required field: title");
            }
            
            $title = $_POST['title'];
            $description = $_POST['description'];
            $detailedDescription = $_POST['detailedDescription'] ?? '';
            $category = $_POST['category'];
            
            // Features & Subservices (Expect JSON string or array)
            $features = $_POST['features'] ?? '[]';
            $subservices = $_POST['subservices'] ?? '[]';

            // Check if this is an update
            $id = $_POST['id'] ?? null;

            $image = '';
            $imageUploadSuccess = false;
            if(isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $target_dir = "uploads/";
                if (!file_exists($target_dir)) {
                    mkdir($target_dir, 0777, true);
                }
                $target_file = $target_dir . basename($_FILES["image"]["name"]);
                if(move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                     $image = "uploads/" . basename($_FILES["image"]["name"]);
                     $imageUploadSuccess = true;
                }
            }

            if ($id) {
                // UPDATE
                $sql = "UPDATE services SET title = :title, description = :description, detailedDescription = :detailedDescription, category = :category, features = :features, subservices = :subservices";
                $params = [
                    ':title' => $title,
                    ':description' => $description,
                    ':detailedDescription' => $detailedDescription,
                    ':category' => $category,
                    ':features' => $features,
                    ':subservices' => $subservices,
                    ':id' => $id
                ];

                if ($imageUploadSuccess) {
                    $sql .= ", image = :image";
                    $params[':image'] = $image;
                }
                
                $sql .= " WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->execute($params);
                echo json_encode(['message' => 'Service updated', 'id' => $id]);

            } else {
                // INSERT
                $sql = "INSERT INTO services (title, description, detailedDescription, category, image, features, subservices) VALUES (:title, :description, :detailedDescription, :category, :image, :features, :subservices)";
                $stmt = $conn->prepare($sql);
                $stmt->execute([
                    ':title' => $title,
                    ':description' => $description,
                    ':detailedDescription' => $detailedDescription,
                    ':category' => $category,
                    ':image' => $image,
                    ':features' => $features,
                    ':subservices' => $subservices
                ]);
                echo json_encode(['message' => 'Service created', 'id' => $conn->lastInsertId()]);
            }
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if(!$id) {
                 $path = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));
                 if(isset($path[0]) && is_numeric($path[0])) {
                     $id = $path[0];
                 }
            }

            if($id) {
                $sql = "DELETE FROM services WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->execute([':id' => $id]);
                echo json_encode(['message' => 'Service deleted']);
            } else {
                 http_response_code(400);
                 echo json_encode(['message' => 'No ID provided']);
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
