<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

$ownerId = $_SESSION['owner']['id'];
$input = json_decode(file_get_contents('php://input'), true);

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

    // Insert new product
    $stmt = $pdo->prepare("INSERT INTO products 
        (business_id, name, description, category, category2, price, stock, unit, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
    ");
    
    $success = $stmt->execute([
        $business['business_id'],
        htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8'),
        !empty($input['description']) ? htmlspecialchars($input['description'], ENT_QUOTES, 'UTF-8') : null,
        htmlspecialchars($input['category'], ENT_QUOTES, 'UTF-8'),
        htmlspecialchars($input['category2'], ENT_QUOTES, 'UTF-8'),
        $input['price'],
        $input['stock'],
        $input['unit']
    ]);

    if ($success) {
        echo json_encode(['success' => true, 'product_id' => $pdo->lastInsertId()]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to save product']);
    }

} catch (PDOException $e) {
    error_log('Database error in save_products.php: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>