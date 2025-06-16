<?php
require_once 'dbconnect.php';
session_start();

if (!isset($_SESSION['admin'])) {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

$statusFilter = $_GET['status'] ?? 'pending';

try {
    $query = "SELECT 
                o.owner_id, o.first_name, o.last_name, o.email, o.phone, o.status, 
                o.created_at as owner_created, o.profile_image,
                b.business_id, b.business_name, b.description as business_description, 
                b.address as business_address, b.logo_path, b.status as business_status,
                b.contact_phone, b.contact_email, b.barangay, 
                b.business_hours, b.special_requirements,
                GROUP_CONCAT(bm.material_type SEPARATOR ', ') as materials_accepted,
                v.id_type, v.id_number, v.id_front_image, v.id_back_image,
                v.verification_status
              FROM owners o
              LEFT JOIN businesses b ON o.owner_id = b.owner_id
              LEFT JOIN business_materials bm ON b.business_id = bm.business_id
              LEFT JOIN owner_verification v ON o.owner_id = v.owner_id";
    
    if ($statusFilter !== 'all') {
        $query .= " WHERE o.status = :status";
    }
    
    $query .= " GROUP BY o.owner_id";
    
    $stmt = $pdo->prepare($query);
    
    if ($statusFilter !== 'all') {
        $stmt->bindParam(':status', $statusFilter);
    }
    
    $stmt->execute();
    $owners = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($owners);
    
} catch (PDOException $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}