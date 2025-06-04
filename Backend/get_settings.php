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
    // Get owner info
    $stmt = $pdo->prepare("SELECT 
            owner_id, first_name, last_name, email, phone, profile_image,
            created_at, updated_at, status
        FROM owners 
        WHERE owner_id = ?
    ");
    $stmt->execute([$ownerId]);
    $ownerData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$ownerData) {
        echo json_encode(['success' => false, 'error' => 'Owner not found']);
        exit;
    }

    // Get business info
    $stmt = $pdo->prepare("SELECT 
            business_id, business_name, description, address, logo_path,
            contact_phone, contact_email, barangay, business_hours, 
            special_requirements, status
        FROM businesses 
        WHERE owner_id = ?
    ");
    $stmt->execute([$ownerId]);
    $businessData = $stmt->fetch(PDO::FETCH_ASSOC);

    // Prepare response
    $response = [
        'success' => true,
        'data' => [
            'owner' => $ownerData,
            'business' => $businessData ?: null
        ]
    ];

    echo json_encode($response);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>