<?php
require_once 'dbconnect.php';
session_start();

if (!isset($_SESSION['admin'])) {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['owner_id']) || empty($data['status'])) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

try {
    $pdo->beginTransaction();
    
    // Update owner status
    $stmt = $pdo->prepare("UPDATE owners SET status = :status, admin_notes = :notes WHERE owner_id = :owner_id");
    $stmt->execute([
        ':status' => $data['status'],
        ':notes' => $data['reason'] ?? '',
        ':owner_id' => $data['owner_id']
    ]);
    
    // If approving, also approve the business
    if ($data['status'] === 'approved') {
        $stmt = $pdo->prepare("UPDATE businesses SET status = 'approved' WHERE owner_id = :owner_id");
        $stmt->execute([':owner_id' => $data['owner_id']]);
    }
    
    $pdo->commit();
    
    echo json_encode(['success' => true]);
    
} catch (PDOException $e) {
    $pdo->rollBack();
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}