<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

try {
    // Determine if we're receiving JSON or form data
    if (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
        $input = json_decode(file_get_contents('php://input'), true);
    } else {
        $input = $_POST;
    }

    // Validate required fields
    if (empty($input['product_id'])) {
        throw new Exception('Product ID is required');
    }

    // Get current product data
    $stmt = $pdo->prepare("SELECT * FROM products WHERE product_id = ?");
    $stmt->execute([$input['product_id']]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        throw new Exception('Product not found');
    }

    // Handle file upload if present
    $imagePath = $product['image']; // keep existing image by default
    if (!empty($_FILES['image']['name'])) {
        $uploadDir = '../uploads/products/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $fileName = uniqid() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imagePath = $fileName;
            // Optionally delete old image
            if ($product['image']) {
                @unlink($uploadDir . $product['image']);
            }
        } else {
            throw new Exception('Failed to upload image');
        }
    }

    // Update the product
    $stmt = $pdo->prepare("UPDATE products 
        SET name = ?, 
            category = ?, 
            category2 = ?, 
            price = ?, 
            stock = ?, 
            unit = ?, 
            description = ?, 
            status = ?,
            image = ?,
            updated_at = NOW()
        WHERE product_id = ?
    ");
    
    $success = $stmt->execute([
        $input['name'] ?? $product['name'],
        $input['category'] ?? $product['category'],
        $input['category2'] ?? $product['category2'],
        $input['price'] ?? $product['price'],
        $input['stock'] ?? $product['stock'],
        $input['unit'] ?? $product['unit'],
        $input['description'] ?? $product['description'],
        $input['status'] ?? $product['status'],
        $imagePath,
        $input['product_id']
    ]);

    if (!$success) {
        throw new Exception('Failed to update product');
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    // Make sure no output has been sent before this
    if (headers_sent()) {
        // If headers were already sent, log the error
        error_log('Product update error: ' . $e->getMessage());
    } else {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
?>