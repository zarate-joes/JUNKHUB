<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

$ownerId = $_SESSION['owner']['id'];

// Get form data
$input = [
    'name' => $_POST['name'] ?? '',
    'category' => $_POST['category'] ?? '',
    'category2' => $_POST['category2'] ?? '',
    'price' => $_POST['price'] ?? 0,
    'stock' => $_POST['stock'] ?? 0,
    'unit' => $_POST['unit'] ?? '',
    'description' => $_POST['description'] ?? ''
];

// Validate required fields
$requiredFields = ['name', 'category', 'category2', 'price', 'stock', 'unit'];
$errors = [];

foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        $errors[$field] = 'This field is required';
    }
}

// Validate numeric fields
if (!is_numeric($input['price']) || $input['price'] <= 0) {
    $errors['price'] = 'Price must be a positive number';
}

if (!is_numeric($input['stock']) || $input['stock'] < 0) {
    $errors['stock'] = 'Stock must be a non-negative number';
}

// If there are validation errors, return them
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    // Get business ID
    $stmt = $pdo->prepare("SELECT business_id FROM businesses WHERE owner_id = ?");
    $stmt->execute([$ownerId]);
    $business = $stmt->fetch();

    if (!$business) {
        echo json_encode(['success' => false, 'error' => 'Business not found']);
        exit;
    }

    // Handle image upload
    $imageName = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/products/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileExt = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $imageName = uniqid('prod_') . '.' . $fileExt;
        $uploadPath = $uploadDir . $imageName;

        // Validate image
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $fileType = mime_content_type($_FILES['image']['tmp_name']);
        
        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode(['success' => false, 'error' => 'Only JPG, PNG, and GIF images are allowed']);
            exit;
        }

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            echo json_encode(['success' => false, 'error' => 'Failed to upload image']);
            exit;
        }
    }

    // Insert new product
    $stmt = $pdo->prepare("INSERT INTO products 
        (business_id, name, description, category, category2, price, stock, unit, image, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    ");
    
    $success = $stmt->execute([
        $business['business_id'],
        htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8'),
        !empty($input['description']) ? htmlspecialchars($input['description'], ENT_QUOTES, 'UTF-8') : null,
        htmlspecialchars($input['category'], ENT_QUOTES, 'UTF-8'),
        htmlspecialchars($input['category2'], ENT_QUOTES, 'UTF-8'),
        $input['price'],
        $input['stock'],
        $input['unit'],
        $imageName
    ]);

    if ($success) {
        echo json_encode(['success' => true, 'product_id' => $pdo->lastInsertId()]);
    } else {
        // If we uploaded an image but failed to save the product, delete the image
        if ($imageName && file_exists($uploadPath)) {
            unlink($uploadPath);
        }
        echo json_encode(['success' => false, 'error' => 'Failed to save product']);
    }

} catch (PDOException $e) {
    error_log('Database error in save_products.php: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>