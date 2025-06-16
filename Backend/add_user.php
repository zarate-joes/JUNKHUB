<?php
require_once 'dbconnect.php';
header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userType = $_POST['user_type'];
    $firstName = $_POST['first_name'];
    $lastName = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $status = $_POST['status'];
    
    if ($userType === 'owner') {
        // Add owner
        $businessName = $_POST['business_name'] ?? '';
        $businessAddress = $_POST['business_address'] ?? '';
        
        $stmt = $pdo->prepare("INSERT INTO owners 
            (first_name, last_name, email, password_hash, phone, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())");
            
        $stmt->execute([$firstName, $lastName, $email, $password, $phone, $status]);
        
        $ownerId = $pdo->lastInsertId();
        
        // Add business if provided
        if (!empty($businessName)) {
            $stmt = $pdo->prepare("INSERT INTO businesses 
                (owner_id, business_name, address, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, NOW(), NOW())");
                
            $stmt->execute([$ownerId, $businessName, $businessAddress, 'active']);
        }
        
    } else {
        // Add regular user
        $stmt = $pdo->prepare("INSERT INTO users 
            (first_name, last_name, email, password_hash, phone, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())");
            
        $stmt->execute([$firstName, $lastName, $email, $password, $phone, $status]);
    }
    
    echo json_encode(['success' => true]);
    
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo json_encode(['error' => 'Email already exists']);
    } else {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}