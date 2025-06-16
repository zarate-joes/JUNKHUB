<?php
require_once 'dbconnect.php';
session_start();

header('Content-Type: application/json');

// Validate session and permissions
if (!isset($_SESSION['owner'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
    exit;
}

$ownerId = $_SESSION['owner']['id'];
$errors = [];

try {
    $pdo->beginTransaction();

    // Process owner information
    $ownerUpdates = [
        'updated_at' => date('Y-m-d H:i:s')
    ];

    // Handle name update if provided
    if (!empty($_POST['first_name']) && !empty($_POST['last_name'])) {
        $ownerUpdates['first_name'] = $_POST['first_name'];
        $ownerUpdates['last_name'] = $_POST['last_name'];
    }

    // Handle email if provided
    if (!empty($_POST['email'])) {
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format');
        }
        $ownerUpdates['email'] = $_POST['email'];
    }

    // Handle phone if provided
    if (!empty($_POST['phone'])) {
        if (!preg_match('/^09[0-9]{9}$/', $_POST['phone'])) {
            throw new Exception('Please enter a valid Philippine mobile number (09XXXXXXXXX)');
        }
        $ownerUpdates['phone'] = $_POST['phone'];
    }

    // Handle profile image upload
    if (!empty($_FILES['profile_image']['name'])) {
        $uploadDir = '../uploads/profiles/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $file = $_FILES['profile_image'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $maxSize = 2 * 1024 * 1024; // 2MB

        if (!in_array($file['type'], $allowedTypes)) {
            throw new Exception('Only JPG, PNG, and GIF images are allowed for profile');
        }
        if ($file['size'] > $maxSize) {
            throw new Exception('Profile image must be less than 2MB');
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = 'profile_' . $ownerId . '_' . time() . '.' . $extension;
        $destination = $uploadDir . $fileName;

        if (move_uploaded_file($file['tmp_name'], $destination)) {
            // Delete old profile image if exists
            $stmt = $pdo->prepare("SELECT profile_image FROM owners WHERE owner_id = ?");
            $stmt->execute([$ownerId]);
            $oldImage = $stmt->fetchColumn();
            
            if ($oldImage && file_exists($uploadDir . $oldImage)) {
                unlink($uploadDir . $oldImage);
            }

            $ownerUpdates['profile_image'] = $fileName;
        } else {
            throw new Exception('Failed to upload profile image');
        }
    }

    // Update owner record only if there are updates
    if (count($ownerUpdates) > 1) { // More than just updated_at
        $updateFields = [];
        $params = ['owner_id' => $ownerId];
        
        foreach ($ownerUpdates as $field => $value) {
            if ($field !== 'owner_id') {
                $updateFields[] = "$field = :$field";
                $params[$field] = $value;
            }
        }
        
        $stmt = $pdo->prepare("UPDATE owners SET " . implode(', ', $updateFields) . " WHERE owner_id = :owner_id");
        $stmt->execute($params);
    }

    // Process business information
    $stmt = $pdo->prepare("SELECT business_id FROM businesses WHERE owner_id = ?");
    $stmt->execute([$ownerId]);
    $businessId = $stmt->fetchColumn();

    if ($businessId) {
        $businessUpdates = [
            'updated_at' => date('Y-m-d H:i:s')
        ];

        // Handle business fields if provided
        if (!empty($_POST['business_name'])) {
            $businessUpdates['business_name'] = $_POST['business_name'];
        }
        if (isset($_POST['description'])) {
            $businessUpdates['description'] = $_POST['description'];
        }
        if (!empty($_POST['address'])) {
            $businessUpdates['address'] = $_POST['address'];
        }
        if (!empty($_POST['barangay'])) {
            $businessUpdates['barangay'] = $_POST['barangay'];
        }
        if (!empty($_POST['business_hours'])) {
            $businessUpdates['business_hours'] = $_POST['business_hours'];
        }

        // Handle logo upload
        if (!empty($_FILES['logo']['name'])) {
            $uploadDir = '../uploads/logos/';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $file = $_FILES['logo'];
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            $maxSize = 2 * 1024 * 1024; // 2MB

            if (!in_array($file['type'], $allowedTypes)) {
                throw new Exception('Only JPG, PNG, and GIF images are allowed for logo');
            }
            if ($file['size'] > $maxSize) {
                throw new Exception('Logo must be less than 2MB');
            }

            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $fileName = 'logo_' . $businessId . '_' . time() . '.' . $extension;
            $destination = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $destination)) {
                // Delete old logo if exists
                $stmt = $pdo->prepare("SELECT logo_path FROM businesses WHERE business_id = ?");
                $stmt->execute([$businessId]);
                $oldLogo = $stmt->fetchColumn();
                
                if ($oldLogo && file_exists($uploadDir . $oldLogo)) {
                    unlink($uploadDir . $oldLogo);
                }

                $businessUpdates['logo_path'] = $fileName;
            } else {
                throw new Exception('Failed to upload logo');
            }
        }

        // Update business record only if there are updates
        if (count($businessUpdates) > 1) { // More than just updated_at
            $updateFields = [];
            $params = ['business_id' => $businessId];
            
            foreach ($businessUpdates as $field => $value) {
                if ($field !== 'business_id') {
                    $updateFields[] = "$field = :$field";
                    $params[$field] = $value;
                }
            }
            
            $stmt = $pdo->prepare("UPDATE businesses SET " . implode(', ', $updateFields) . " WHERE business_id = :business_id");
            $stmt->execute($params);
        }

        // Update accepted materials if provided
        if (!empty($_POST['materials'])) {
            $materials = json_decode($_POST['materials'], true);
            
            if (is_array($materials)) {
                // First delete existing materials
                $stmt = $pdo->prepare("DELETE FROM business_materials WHERE business_id = ?");
                $stmt->execute([$businessId]);
                
                // Then insert new ones
                $stmt = $pdo->prepare("INSERT INTO business_materials (business_id, material_type) VALUES (?, ?)");
                foreach ($materials as $material) {
                    if (!empty($material)) {
                        $stmt->execute([$businessId, $material]);
                    }
                }
            }
        }
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);

} catch (PDOException $e) {
    $pdo->rollBack();
    error_log('Database error in update_profile: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Database error occurred']);
} catch (Exception $e) {
    $pdo->rollBack();
    error_log('Error in update_profile: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>