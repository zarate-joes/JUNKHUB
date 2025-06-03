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
    // Get owner and business info
    $stmt = $pdo->prepare("SELECT 
            o.first_name, o.last_name, o.email, o.phone,
            b.business_name, b.address, b.description, b.logo_path as logo
        FROM owners o
        LEFT JOIN businesses b ON o.owner_id = b.owner_id
        WHERE o.owner_id = ?
    ");
    $stmt->execute([$ownerId]);
    $settings = $stmt->fetch();

    if (!$settings) {
        echo json_encode(['success' => false, 'error' => 'Settings not found']);
        exit;
    }

    // Combine names for full_name field
    $settings['full_name'] = $settings['first_name'] . ' ' . $settings['last_name'];

    echo json_encode(['success' => true, 'data' => $settings]);

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