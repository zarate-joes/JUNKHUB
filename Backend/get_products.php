<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

$ownerId = $_SESSION['owner']['id'];

try {
    // Get business ID first
    $stmt = $pdo->prepare("SELECT business_id FROM businesses WHERE owner_id = ?");
    $stmt->execute([$ownerId]);
    $business = $stmt->fetch();

    if (!$business) {
        echo json_encode(['success' => false, 'error' => 'Business not found']);
        exit;
    }

    // Get products
    $stmt = $pdo->prepare("SELECT product_id, name, description, category, category2, 
               price, stock, unit, status, image
        FROM products
        WHERE business_id = ?
        ORDER BY name
    ");
    $stmt->execute([$business['business_id']]);
    $products = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $products]);

    // Check if business exists
    $stmt = $pdo->prepare("SELECT business_id FROM businesses WHERE owner_id = ?");
    $stmt->execute([$ownerId]);
    $business = $stmt->fetch();

    if (!$business) {
        // Create default business if none exists
        $defaultBusiness = [
            'business_name' => $_SESSION['owner']['first_name'] . "'s Business",
            'contact_email' => $_SESSION['owner']['email'],
            'contact_phone' => $_SESSION['owner']['phone'] ?? '',
            'status' => 'active'
        ];
        
        $stmt = $pdo->prepare("INSERT INTO businesses 
            (owner_id, business_name, description, contact_phone, contact_email, 
             address, barangay, business_hours, status)
            VALUES 
            (?, ?, '', ?, ?, '', '', '9AM-5PM', ?)
        ");
        $stmt->execute([
            $ownerId,
            $defaultBusiness['business_name'],
            $defaultBusiness['contact_phone'],
            $defaultBusiness['contact_email'],
            $defaultBusiness['status']
        ]);
        
        $businessId = $pdo->lastInsertId();
    } else {
        $businessId = $business['business_id'];
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>