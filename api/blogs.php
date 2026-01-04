<?php
require_once "cors.php";
require_once "db.php";

// 1. Auto-Create Table if not exists (Self-Healing)
try {
    $conn->exec("CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(100),
        author VARCHAR(100),
        readTime VARCHAR(50),
        image VARCHAR(255),
        tags TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {
    // Continue consistently
}

$method = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

try {
    switch ($method) {
        case 'GET':
            $sql = "SELECT * FROM blogs ORDER BY created_at DESC";
            if(isset($_GET['id'])) {
                $sql = "SELECT * FROM blogs WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $_GET['id']);
            } else {
                $stmt = $conn->prepare($sql);
            }
            
            $stmt->execute();
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach($blogs as &$blog) {
                 if(isset($blog['tags']) && $blog['tags']) {
                     $blog['tags'] = explode(',', $blog['tags']);
                 } else {
                     $blog['tags'] = [];
                 }
            }
            
            if(isset($_GET['id'])) {
                 echo json_encode($blogs[0] ?? null);
            } else {
                 echo json_encode($blogs);
            }
            break;

        case 'POST':
            if (!isset($_POST['title'])) {
                 throw new Exception("Missing required field: title");
            }

            $title = $_POST['title'];
            $excerpt = $_POST['excerpt'];
            $content = $_POST['content'];
            $category = $_POST['category'];
            $author = $_POST['author'];
            $readTime = $_POST['readTime'];
            $tags = $_POST['tags']; // Comma separated
            
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
                $sql = "UPDATE blogs SET title = :title, excerpt = :excerpt, content = :content, category = :category, author = :author, readTime = :readTime, tags = :tags";
                $params = [
                    ':title' => $title,
                    ':excerpt' => $excerpt,
                    ':content' => $content,
                    ':category' => $category,
                    ':author' => $author,
                    ':readTime' => $readTime,
                    ':tags' => $tags,
                    ':id' => $id
                ];

                if ($imageUploadSuccess) {
                    $sql .= ", image = :image";
                    $params[':image'] = $image;
                }
                
                $sql .= " WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->execute($params);
                echo json_encode(['message' => 'Blog updated', 'id' => $id]);

            } else {
                // INSERT
                $sql = "INSERT INTO blogs (title, excerpt, content, category, author, readTime, image, tags) VALUES (:title, :excerpt, :content, :category, :author, :readTime, :image, :tags)";
                $stmt = $conn->prepare($sql);
                $stmt->execute([
                    ':title' => $title,
                    ':excerpt' => $excerpt,
                    ':content' => $content,
                    ':category' => $category,
                    ':author' => $author,
                    ':readTime' => $readTime,
                    ':image' => $image,
                    ':tags' => $tags
                ]);
                echo json_encode(['message' => 'Blog created', 'id' => $conn->lastInsertId()]);
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
                $sql = "DELETE FROM blogs WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->execute([':id' => $id]);
                echo json_encode(['message' => 'Blog deleted']);
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