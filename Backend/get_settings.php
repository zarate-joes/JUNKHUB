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
    // Get owner info including verification data
    $stmt = $pdo->prepare("SELECT 
            o.owner_id, o.first_name, o.last_name, o.email, o.phone, o.profile_image,
            o.created_at, o.updated_at, o.status,
            ov.id_type, ov.id_number, ov.id_front_image, ov.id_back_image
        FROM owners o
        LEFT JOIN owner_verification ov ON o.owner_id = ov.owner_id
        WHERE o.owner_id = ?
    ");
    $stmt->execute([$ownerId]);
    $ownerData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$ownerData) {
        echo json_encode(['success' => false, 'error' => 'Owner not found']);
        exit;
    }

    // Get business info including materials
    $businessData = null;
    $materials = [];
    
    $stmt = $pdo->prepare("SELECT 
            b.business_id, b.business_name, b.description, b.address, b.logo_path,
            b.contact_phone, b.contact_email, b.barangay, b.business_hours, 
            b.special_requirements, b.status
        FROM businesses b
        WHERE b.owner_id = ?
    ");
    $stmt->execute([$ownerId]);
    $businessData = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($businessData) {
        // Get business materials
        $stmt = $pdo->prepare("SELECT material_type FROM business_materials WHERE business_id = ?");
        $stmt->execute([$businessData['business_id']]);
        $materials = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
        $businessData['materials'] = $materials;
    }

    // Prepare response
    $response = [
        'success' => true,
        'data' => [
            'owner' => $ownerData,
            'business' => $businessData
        ]
    ];

    echo json_encode($response);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>