<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}


$ownerId = $_SESSION['owner']['id'];
$response = ['success' => false];

try {
    // Validate inputs
    $required = ['full_name', 'email', 'phone', 'business_name', 'address'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Handle file upload if exists
    $logoName = null;
    if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
        // Validate file
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $maxSize = 2 * 1024 * 1024; // 2MB
        
        if (!in_array($_FILES['logo']['type'], $allowedTypes)) {
            throw new Exception('Invalid file type. Only JPG, PNG, and GIF are allowed.');
        }
        
        if ($_FILES['logo']['size'] > $maxSize) {
            throw new Exception('File too large. Maximum 2MB allowed.');
        }
        
        $uploadDir = '../uploads/logos/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $fileExt = pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION);
        $fileName = 'logo_' . $ownerId . '_' . time() . '.' . strtolower($fileExt);
        $logoPath = $uploadDir . $fileName;
        
        if (!move_uploaded_file($_FILES['logo']['tmp_name'], $logoPath)) {
            throw new Exception('Failed to upload logo');
        }
        
        // Remove old logo if exists
        $stmt = $pdo->prepare("SELECT logo FROM businesses WHERE owner_id = ?");
        $stmt->execute([$ownerId]);
        $oldLogo = $stmt->fetchColumn();
        
        if ($oldLogo && file_exists($uploadDir . $oldLogo)) {
            unlink($uploadDir . $oldLogo);
        }
        
        $logoName = $fileName;
    }

    // Start transaction
    $pdo->beginTransaction();

    // Split full name safely
    $nameParts = explode(' ', trim($_POST['full_name']), 2);
    $firstName = $nameParts[0];
    $lastName = isset($nameParts[1]) ? $nameParts[1] : '';

    // Update owner info
    $stmt = $pdo->prepare("
        UPDATE owners 
        SET first_name = ?, last_name = ?, email = ?, phone = ?, updated_at = NOW()
        WHERE owner_id = ?
    ");
    $stmt->execute([
        $firstName,
        $lastName,
        filter_var($_POST['email'], FILTER_SANITIZE_EMAIL),
        filter_var($_POST['phone'], FILTER_SANITIZE_STRING),
        $ownerId
    ]);

    // Update business info
    $stmt = $pdo->prepare("
        UPDATE businesses 
        SET business_name = ?, address = ?, description = ?,
            logo = COALESCE(?, logo), updated_at = NOW()
        WHERE owner_id = ?
    ");
    $stmt->execute([
        filter_var($_POST['business_name'], FILTER_SANITIZE_STRING),
        filter_var($_POST['address'], FILTER_SANITIZE_STRING),
        filter_var($_POST['description'], FILTER_SANITIZE_STRING),
        $logoName,
        $ownerId
    ]);

    $pdo->commit();

    // Update session data
    $_SESSION['owner']['firstName'] = $firstName;
    $_SESSION['owner']['lastName'] = $lastName;
    $_SESSION['owner']['email'] = $_POST['email'];

    $response = ['success' => true];

} catch (Exception $e) {
    $pdo->rollBack();
    $response = ['success' => false, 'error' => $e->getMessage()];
}

echo json_encode($response);
?>