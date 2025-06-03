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

    $stmt = $pdo->prepare("SELECT message_id as id, subject, content, 
            CONCAT(sender_name, ' <', COALESCE(sender_email, ''), '>') as `from`,
            DATE_FORMAT(created_at, '%b %d, %Y %h:%i %p') as time,
            is_read as `read`, message_type as type
        FROM messages
        WHERE business_id = ?
        ORDER BY created_at DESC
    ");
    $stmt->execute([$business['business_id']]);
    $messages = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $messages]);

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