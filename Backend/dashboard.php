<?php
require_once 'dbconnect.php';
session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'domain' => $_SERVER['HTTP_HOST'],
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict'
]);
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner']) || empty($_SESSION['owner']['id'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

$ownerId = $_SESSION['owner']['id'];

try {
    // Get owner and business info
   $stmt = $pdo->prepare("SELECT o.*, b.business_id, b.business_name, b.logo_path as logo 
        FROM owners o
        LEFT JOIN businesses b ON o.owner_id = b.owner_id
        WHERE o.owner_id = ?
    ");
    $stmt->execute([$ownerId]);
    $data = $stmt->fetch();

    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Owner not found']);
        exit;
    }

    // Get statistics
    $stats = [];
    $stmt = $pdo->prepare("SELECT 
            COUNT(DISTINCT p.product_id) as product_count,
            SUM(CASE WHEN o.status = 'pending' THEN 1 ELSE 0 END) as pending_orders,
            SUM(CASE WHEN o.status = 'completed' THEN o.total_amount ELSE 0 END) as total_sales
        FROM orders o
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.product_id
        WHERE o.business_id = ?
    ");
    $stmt->execute([$data['business_id']]);
    $stats = $stmt->fetch();

    // Get recent orders
    $stmt = $pdo->prepare("SELECT o.order_id, CONCAT(c.first_name, ' ', c.last_name) as customer_name, 
               o.order_date, o.status,
               GROUP_CONCAT(CONCAT(p.name, ' (', oi.quantity, p.unit, ')') SEPARATOR ', ') as items
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.business_id = ?
        GROUP BY o.order_id
        ORDER BY o.order_date DESC
        LIMIT 5
    ");
    $stmt->execute([$data['business_id']]);
    $recentOrders = $stmt->fetchAll();

    // Get recent messages
    $stmt = $pdo->prepare("SELECT message_id as id, subject, content, 
            CONCAT(sender_name, ' <', sender_email, '>') as `from`,
            DATE_FORMAT(created_at, '%b %d, %Y %h:%i %p') as time,
            is_read as `read`, message_type as type
        FROM messages
        WHERE business_id = ?
        ORDER BY created_at DESC
        LIMIT 5
    ");
    $stmt->execute([$data['business_id']]);
    $recentMessages = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => [
            ...$data,
            'statistics' => $stats,
            'recent_orders' => $recentOrders,
            'recent_messages' => $recentMessages
        ]
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