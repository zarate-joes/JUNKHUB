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
    // Get business ID
    $stmt = $pdo->prepare("SELECT business_id FROM businesses WHERE owner_id = ?");
    $stmt->execute([$ownerId]);
    $business = $stmt->fetch();

    if (!$business) {
        echo json_encode(['success' => false, 'error' => 'Business not found']);
        exit;
    }

    // Get orders
    $stmt = $pdo->prepare("SELECT o.order_id, CONCAT(c.first_name, ' ', c.last_name) as customer_name, 
               o.order_date, o.status, o.total_amount as total,
               COUNT(oi.order_item_id) as items_count
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        WHERE o.business_id = ?
        GROUP BY o.order_id
        ORDER BY o.order_date DESC
    ");
    $stmt->execute([$business['business_id']]);
    $orders = $stmt->fetchAll();

    // Get summary
    $stmt = $pdo->prepare("SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status IN ('new', 'accepted') THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
        FROM orders
        WHERE business_id = ?
    ");
    $stmt->execute([$business['business_id']]);
    $summary = $stmt->fetch();

    echo json_encode([
        'success' => true,
        'data' => $orders,
        'summary' => $summary
    ]);

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