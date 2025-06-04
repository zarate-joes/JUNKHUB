<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

$productId = $_GET['id'] ?? null;

if (!$productId) {
    echo json_encode(['success' => false, 'error' => 'Product ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE product_id = ?");
    $stmt->execute([$productId]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode(['success' => true, 'data' => $product]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Product not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>