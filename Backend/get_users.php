<?php
require_once '../Backend/dbconnect.php';
header('Content-Type: application/json');

try {
    // Check if requesting a single user
    if (isset($_GET['id'])) {
        $userId = $_GET['id'];
        
        // First try to find in users table
        $stmt = $pdo->prepare("SELECT 
            u.user_id as id, 
            u.first_name, 
            u.last_name, 
            u.email, 
            u.phone, 
            u.profile_image, 
            u.created_at, 
            'user' as role,
            u.status,
            NULL as business_name,
            NULL as business_address
          FROM users u
          WHERE u.user_id = :id");
        $stmt->bindValue(':id', $userId);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // If not found in users, try owners table
        if (!$user) {
            $stmt = $pdo->prepare("SELECT 
                o.owner_id as id, 
                o.first_name, 
                o.last_name, 
                o.email, 
                o.phone, 
                o.profile_image, 
                o.created_at, 
                'owner' as role,
                o.status,
                b.business_name,
                b.address as business_address
            FROM owners o
            LEFT JOIN businesses b ON o.owner_id = b.owner_id
            WHERE o.owner_id = :id");
            $stmt->bindValue(':id', $userId);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        
        if ($user) {
            echo json_encode($user);
        } else {
            echo json_encode(['error' => 'User not found']);
        }
        exit();
    }

    // Original listing functionality
    $role = $_GET['role'] ?? 'all';
    $status = $_GET['status'] ?? 'all';
    $search = $_GET['search'] ?? '';
    
    $userQuery = "SELECT 
        u.user_id as id, 
        u.first_name, 
        u.last_name, 
        u.email, 
        u.phone, 
        u.profile_image, 
        u.created_at, 
        'user' as role,
        u.status
      FROM users u
      WHERE 1=1";
    
    $ownerQuery = "SELECT 
        o.owner_id as id, 
        o.first_name, 
        o.last_name, 
        o.email, 
        o.phone, 
        o.profile_image, 
        o.created_at, 
        'owner' as role,
        o.status
      FROM owners o
      WHERE 1=1";
    
    if ($role !== 'all') {
        if ($role === 'owner') {
            $userQuery .= " AND 1=0";
        } else {
            $ownerQuery .= " AND 1=0";
        }
    }
    
    if ($status !== 'all') {
        $userQuery .= " AND u.status = :status";
        $ownerQuery .= " AND o.status = :status";
    }
    
    if (!empty($search)) {
        $searchTerm = "%$search%";
        $userQuery .= " AND (u.first_name LIKE :search OR u.last_name LIKE :search OR u.email LIKE :search)";
        $ownerQuery .= " AND (o.first_name LIKE :search OR o.last_name LIKE :search OR o.email LIKE :search)";
    }
    
    $query = "($userQuery) UNION ALL ($ownerQuery) ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    
    if ($status !== 'all') {
        $stmt->bindValue(':status', $status);
    }
    
    if (!empty($search)) {
        $stmt->bindValue(':search', $searchTerm);
    }
    
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($users);
    
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}