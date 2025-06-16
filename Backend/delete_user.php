<?php
require_once 'dbconnect.php';
header('Content-Type: application/json');

try {
    $userId = $_GET['id'];
    $role = $_GET['role'] ?? 'user'; // Default to user if not specified
    
    if ($role === 'owner') {
        // First delete the owner's business if exists
        $stmt = $pdo->prepare("DELETE FROM businesses WHERE owner_id = ?");
        $stmt->execute([$userId]);
        
        // Then delete the owner
        $stmt = $pdo->prepare("DELETE FROM owners WHERE owner_id = ?");
        $stmt->execute([$userId]);
    } else {
        // Delete regular user
        $stmt = $pdo->prepare("DELETE FROM users WHERE user_id = ?");
        $stmt->execute([$userId]);
    }
    
    echo json_encode(['success' => true]);
    
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}