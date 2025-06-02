<?php
require_once 'dbconnect.php';
session_start();

// At start of shop-creation.php
if (!isset($pdo)) {
    die("Database connection failed");
}

// Verify owner is logged in
if (!isset($_SESSION['owner']['id'])) {
    header('Location: ../Owner Registration/owner_sign_in.php');
    exit();
}



$ownerId = $_SESSION['owner']['id'];
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['launchShop'])) {
    // Validate and sanitize inputs
    $businessName = htmlspecialchars(trim($_POST['shopName']));
    $description = htmlspecialchars(trim($_POST['shopDescription']));
    $contactPhone = preg_replace('/\D/', '', $_POST['contactPhone']);
    $contactEmail = filter_var(trim($_POST['contactEmail']), FILTER_SANITIZE_EMAIL);
    $address = htmlspecialchars(trim($_POST['fullAddress']));
    $barangay = htmlspecialchars(trim($_POST['barangay']));
    $businessHours = htmlspecialchars(trim($_POST['businessHours']));
    $specialRequirements = htmlspecialchars(trim($_POST['specialRequirements']));
    
    // Validate required fields
    if (empty($businessName)) $errors['shopName'] = 'Shop name is required';
    if (empty($contactPhone)) $errors['contactPhone'] = 'Contact phone is required';
    if (empty($contactEmail)) $errors['contactEmail'] = 'Contact email is required';
    if (!filter_var($contactEmail, FILTER_VALIDATE_EMAIL)) $errors['contactEmail'] = 'Invalid email format';
    if (empty($address)) $errors['fullAddress'] = 'Address is required';
    if (empty($barangay)) $errors['barangay'] = 'Barangay is required';
    
    // Handle file upload
    // Handle file upload
    $logoPath = null;

    if (isset($_FILES['shopLogo'])) {
        // Check for upload errors first
        switch ($_FILES['shopLogo']['error']) {
            case UPLOAD_ERR_OK:
                // Proceed only if the upload is okay
                break;
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $errors['shopLogo'] = 'File size exceeds maximum allowed (2MB)';
                return;
            case UPLOAD_ERR_PARTIAL:
                $errors['shopLogo'] = 'The uploaded file was only partially uploaded';
                return;
            case UPLOAD_ERR_NO_FILE:
                // No file uploaded – optional logo, so skip
                break;
            default:
                $errors['shopLogo'] = 'An unknown error occurred during file upload';
                return;
        }

        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        // Check if the file was actually uploaded
        if (is_uploaded_file($_FILES['shopLogo']['tmp_name'])) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $detectedType = finfo_file($finfo, $_FILES['shopLogo']['tmp_name']);
            finfo_close($finfo);

            if (in_array($detectedType, $allowedTypes)) {
                $uploadDir = '../uploads/business_logos/';

                // Create directory if it doesn't exist
                if (!file_exists($uploadDir)) {
                    if (!mkdir($uploadDir, 0755, true)) {
                        $errors['shopLogo'] = 'Failed to create upload directory';
                        return;
                    }
                }

                $extension = pathinfo($_FILES['shopLogo']['name'], PATHINFO_EXTENSION);
                $filename = 'logo_' . $ownerId . '_' . time() . '.' . $extension;
                $destination = $uploadDir . $filename;

                if (move_uploaded_file($_FILES['shopLogo']['tmp_name'], $destination)) {
                    $logoPath = $destination; // Save for database or session use
                } else {
                    $errors['shopLogo'] = 'Failed to upload logo';
                }
            } else {
                $errors['shopLogo'] = 'Invalid file type. Only JPG, PNG, and GIF are allowed.';
            }
        } else {
            $errors['shopLogo'] = 'No valid file uploaded.';
        }
    }

    
    // Get materials
    $materials = $_POST['materials'] ?? [];
    
    if (empty($errors)) {
        try {
            $pdo->beginTransaction();
            
            // Insert business
            $stmt = $pdo->prepare('INSERT INTO businesses (
                    owner_id, business_name, description, logo_path, 
                    contact_phone, contact_email, address, barangay, 
                    business_hours, special_requirements
                ) VALUES (
                    :owner_id, :business_name, :description, :logo_path,
                    :contact_phone, :contact_email, :address, :barangay,
                    :business_hours, :special_requirements
                )
            ');
            
            $stmt->execute([
                ':owner_id' => $ownerId,
                ':business_name' => $businessName,
                ':description' => $description,
                ':logo_path' => $logoPath,
                ':contact_phone' => $contactPhone,
                ':contact_email' => $contactEmail,
                ':address' => $address,
                ':barangay' => $barangay,
                ':business_hours' => $businessHours,
                ':special_requirements' => $specialRequirements
            ]);
            
            $businessId = $pdo->lastInsertId();
            
            // Insert materials
            if (!empty($materials)) {
                $materialStmt = $pdo->prepare("
                    INSERT INTO business_materials (business_id, material_type)
                    VALUES (:business_id, :material_type)
                ");
                
                foreach ($materials as $material) {
                    $materialStmt->execute([
                        ':business_id' => $businessId,
                        ':material_type' => htmlspecialchars(trim($material))
                    ]);
                }
            }
            
            // Update owner with business_id
            $updateOwner = $pdo->prepare("
                UPDATE owners SET business_id = ? WHERE id = ?
            ");
            $updateOwner->execute([$businessId, $ownerId]);
            
            $pdo->commit();
            
            // Update session
            $_SESSION['owner']['business_id'] = $businessId;
            
            // Success - redirect to dashboard
            $_SESSION['success'] = 'Business created successfully!';
            header('Location: ../Owner Registration/owner_sign_in.php');
            exit();
            
        } catch (PDOException $e) {
            $pdo->rollBack();
            error_log("Business creation error: " . $e->getMessage());
            $errors['database'] = 'Failed to create business. Please try again.';
        }
    }
    
    // If errors, return to form with data
    $_SESSION['errors'] = $errors;
    $_SESSION['old'] = $_POST;
    header('Location: ../Owner Registration/shopsignup.php');
    exit();
} else {
    header('Location: ../Owner Registration/shopsignup.php');
    exit();
}