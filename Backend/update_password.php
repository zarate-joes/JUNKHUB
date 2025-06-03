<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$ownerId = $_SESSION['owner']['id'];

try {
    // Verify current password
    $stmt = $pdo->prepare("SELECT password_hash FROM owners WHERE owner_id = ?");
    $stmt->execute([$ownerId]);
    $owner = $stmt->fetch();

    if (!$owner || !password_verify($input['currentPassword'], $owner['password_hash'])) {
        echo json_encode(['success' => false, 'error' => 'Current password is incorrect']);
        exit;
    }

    // Update password
    $newHash = password_hash($input['newPassword'], PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("UPDATE owners SET password_hash = ? WHERE owner_id = ?");
    $stmt->execute([$newHash, $ownerId]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>