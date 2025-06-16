<?php
require_once 'dbconnect.php'; 

session_start();
$errors = [];
$success = false;

// OWNER SIGNUP PROCESS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])) {
    // Input sanitization
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $firstName = htmlspecialchars(trim($_POST['firstName']));
    $lastName = htmlspecialchars(trim($_POST['lastName']));
    $contactNumber = preg_replace('/\D/', '', $_POST['contactNumber']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $created_at = date('Y-m-d H:i:s');

    // Validation (keep all your existing validation code)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }

    if (empty($firstName)) {
        $errors['firstName'] = 'First name is required';
    } elseif (!preg_match('/^[a-zA-Z\s]+$/', $firstName)) {
        $errors['firstName'] = 'First name can only contain letters and spaces';
    }

    if (empty($lastName)) {
        $errors['lastName'] = 'Last name is required';
    } elseif (!preg_match('/^[a-zA-Z\s]+$/', $lastName)) {
        $errors['lastName'] = 'Last name can only contain letters and spaces';
    }

    if (empty($contactNumber)) {
        $errors['contactNumber'] = 'Contact number is required';
    } elseif (!preg_match('/^09[0-9]{9}$/', $contactNumber)) {
        $errors['contactNumber'] = 'Please enter a valid Philippine mobile number (09XXXXXXXXX)';
    } else {
        $contactNumber = preg_replace('/^\+639/', '09', $contactNumber);
    }

    // Password validation (keep your existing password validation)
    $hasError = false;
    if (strlen($password) < 12) {
        $errors['password_length'] = 'Password must be at least 12 characters long';
        $hasError = true;
    }
    if (!preg_match('/[A-Z]/', $password)) {
        $errors['password_uppercase'] = 'Password must contain at least one uppercase letter (A-Z)';
        $hasError = true;
    }
    if (!preg_match('/[a-z]/', $password)) {
        $errors['password_lowercase'] = 'Password must contain at least one lowercase letter (a-z)';
        $hasError = true;
    }
    if (!preg_match('/[0-9]/', $password)) {
        $errors['password_number'] = 'Password must contain at least one number (0-9)';
        $hasError = true;
    }
    if (!preg_match('/[!@#$%^&*]/', $password)) {
        $errors['password_special'] = 'Password must contain at least one special character (!@#$%^&*)';
        $hasError = true;
    }
    if ($hasError) {
        $errors['password'] = 'Password does not meet requirements';
    }

    if ($password !== $confirm_password) {
        $errors['confirm_password'] = 'Passwords do not match';
    }

    if (!isset($_POST['terms'])) {
        $errors['terms'] = 'You must agree to the terms and conditions';
    }

    // ID VALIDATION
    $id_type = htmlspecialchars(trim($_POST['id_type'] ?? ''));
    $id_number = htmlspecialchars(trim($_POST['id_number'] ?? ''));

    if (empty($id_type)) {
        $errors['id_type'] = 'ID type is required';
    }

    if (empty($id_number)) {
        $errors['id_number'] = 'ID number is required';
    } elseif (!preg_match('/^[a-zA-Z0-9\-]+$/', $id_number)) {
        $errors['id_number'] = 'ID number can only contain letters, numbers, and hyphens';
    }

    // File upload handling (keep your existing file upload code)
    $uploadDir = '../uploads/ids/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    $maxFileSize = 2 * 1024 * 1024; // 2MB

    // Process front ID
    $idFrontName = '';
    if (isset($_FILES['id_front']) && $_FILES['id_front']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['id_front'];
        
        if (!in_array($file['type'], $allowedTypes)) {
            $errors['id_front'] = 'Only JPG, PNG, and GIF images are allowed';
        } elseif ($file['size'] > $maxFileSize) {
            $errors['id_front'] = 'File size must be less than 2MB';
        } else {
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $idFrontName = 'front_' . uniqid() . '.' . $extension;
            $destination = $uploadDir . $idFrontName;
            
            if (!move_uploaded_file($file['tmp_name'], $destination)) {
                $errors['id_front'] = 'Failed to upload ID front image';
            }
        }
    } else {
        $errors['id_front'] = 'Front ID image is required';
    }

    // Process back ID
    $idBackName = '';
    if (isset($_FILES['id_back']) && $_FILES['id_back']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['id_back'];
        
        if (!in_array($file['type'], $allowedTypes)) {
            $errors['id_back'] = 'Only JPG, PNG, and GIF images are allowed';
        } elseif ($file['size'] > $maxFileSize) {
            $errors['id_back'] = 'File size must be less than 2MB';
        } else {
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $idBackName = 'back_' . uniqid() . '.' . $extension;
            $destination = $uploadDir . $idBackName;
            
            if (!move_uploaded_file($file['tmp_name'], $destination)) {
                $errors['id_back'] = 'Failed to upload ID back image';
            }
        }
    } else {
        $errors['id_back'] = 'Back ID image is required';
    }

    // Check for existing owner
    $stmt = $pdo->prepare('SELECT owner_id FROM owners WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if($stmt->fetch()){
        $errors['owner_exist'] = 'This email is already registered as an owner';
    }

    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        try {
            $pdo->beginTransaction();

            // Insert owner
            $stmt = $pdo->prepare('INSERT INTO owners 
                (email, password_hash, first_name, last_name, phone, created_at) 
                VALUES (:email, :password, :firstName, :lastName, :contactNumber, :created_at)');

            $stmt->execute([
                'email' => $email,
                'password' => $hashedPassword,
                'firstName' => $firstName,
                'lastName' => $lastName,
                'contactNumber' => $contactNumber,
                'created_at' => $created_at
            ]);

            $ownerId = $pdo->lastInsertId();

            // Insert verification data
            $stmt = $pdo->prepare('INSERT INTO owner_verification 
                (owner_id, id_type, id_number, id_front_image, id_back_image) 
                VALUES (:owner_id, :id_type, :id_number, :id_front_image, :id_back_image)');

            $stmt->execute([
                'owner_id' => $ownerId,
                'id_type' => $id_type,
                'id_number' => $id_number,
                'id_front_image' => $idFrontName,
                'id_back_image' => $idBackName
            ]);

            // Create default business record
            $businessName = "Business for ".$firstName." ".$lastName;
            $businessStmt = $pdo->prepare('INSERT INTO businesses (
                owner_id, business_name, contact_phone, contact_email, status
            ) VALUES (
                :owner_id, :business_name, :contact_phone, :contact_email, :status
            )');
            
            $businessStmt->execute([
                ':owner_id' => $ownerId,
                ':business_name' => $businessName,
                ':contact_phone' => $contactNumber,
                ':contact_email' => $email,
                ':status' => 'pending_setup'
            ]);
            
            $businessId = $pdo->lastInsertId();
            
            // Update owner with business_id
            $updateOwner = $pdo->prepare("UPDATE owners SET business_id = ? WHERE owner_id = ?");
            $updateOwner->execute([$businessId, $ownerId]);

            $pdo->commit();

            // Store in session
            $_SESSION['owner'] = [
                'id' => $ownerId,
                'email' => $email,
                'firstName' => $firstName,
                'lastName' => $lastName,
                'phone' => $contactNumber,
                'created_at' => $created_at,
                'business_id' => $businessId,
                'is_owner' => true
            ];

            $_SESSION['success'] = 'Owner account created successfully! Please complete your business setup.';
            header('Location: ../Owner Registration/shopsignup.php');
            exit();

        } catch (PDOException $e) {
            $pdo->rollBack();
            error_log('Database error: ' . $e->getMessage());
            
            // Clean up uploaded files if transaction fails
            if (!empty($idFrontName) && file_exists($uploadDir . $idFrontName)) {
                unlink($uploadDir . $idFrontName);
            }
            if (!empty($idBackName) && file_exists($uploadDir . $idBackName)) {
                unlink($uploadDir . $idBackName);
            }
            
            $errors['database'] = 'An error occurred during registration. Please try again.';
            $_SESSION['errors'] = $errors;
            $_SESSION['old'] = $_POST;
            header('Location: ../Owner Registration/owner_sign_up.php');
            exit();
        }
    } else {
        // Return with validation errors
        $_SESSION['errors'] = $errors;
        $_SESSION['old'] = $_POST;
        header('Location: ../Owner Registration/owner_sign_up.php');
        exit();
    }
}

// BUSINESS CREATION PROCESS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['launchShop'])) {
    // Verify owner is logged in
    if (!isset($_SESSION['owner']['id'])) {
        header('Location: ../Owner Registration/owner_sign_in.php');
        exit();
    }
    
    $ownerId = $_SESSION['owner']['id'];
    $businessId = $_SESSION['owner']['business_id'] ?? null;
    
    // Validate inputs
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
    $logoPath = null;
    if (isset($_FILES['shopLogo'])) {
        switch ($_FILES['shopLogo']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $errors['shopLogo'] = 'File size exceeds maximum allowed (2MB)';
                break;
            case UPLOAD_ERR_PARTIAL:
                $errors['shopLogo'] = 'The uploaded file was only partially uploaded';
                break;
            case UPLOAD_ERR_NO_FILE:
                // No file uploaded - optional
                break;
            default:
                $errors['shopLogo'] = 'An unknown error occurred during file upload';
                break;
        }

        if (!isset($errors['shopLogo']) && is_uploaded_file($_FILES['shopLogo']['tmp_name'])) {
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $detectedType = finfo_file($finfo, $_FILES['shopLogo']['tmp_name']);
            finfo_close($finfo);

            if (in_array($detectedType, $allowedTypes)) {
                $uploadDir = '../uploads/business_logos/';
                if (!file_exists($uploadDir)) {
                    if (!mkdir($uploadDir, 0755, true)) {
                        $errors['shopLogo'] = 'Failed to create upload directory';
                    }
                }

                if (!isset($errors['shopLogo'])) {
                    $extension = pathinfo($_FILES['shopLogo']['name'], PATHINFO_EXTENSION);
                    $filename = 'logo_' . $ownerId . '_' . time() . '.' . $extension;
                    $destination = $uploadDir . $filename;

                    if (move_uploaded_file($_FILES['shopLogo']['tmp_name'], $destination)) {
                        $logoPath = $destination;
                    } else {
                        $errors['shopLogo'] = 'Failed to upload logo';
                    }
                }
            } else {
                $errors['shopLogo'] = 'Invalid file type. Only JPG, PNG, and GIF are allowed.';
            }
        }
    }

    // Get materials
    $materials = $_POST['materials'] ?? [];
    
    if (empty($errors)) {
        try {
            $pdo->beginTransaction();
            
            // Update the existing business record
            $stmt = $pdo->prepare('UPDATE businesses SET
                business_name = :business_name,
                description = :description,
                logo_path = :logo_path,
                contact_phone = :contact_phone,
                contact_email = :contact_email,
                address = :address,
                barangay = :barangay,
                business_hours = :business_hours,
                special_requirements = :special_requirements,
                status = :status
                WHERE business_id = :business_id AND owner_id = :owner_id
            ');
            
            $stmt->execute([
                ':business_name' => $businessName,
                ':description' => $description,
                ':logo_path' => $logoPath,
                ':contact_phone' => $contactPhone,
                ':contact_email' => $contactEmail,
                ':address' => $address,
                ':barangay' => $barangay,
                ':business_hours' => $businessHours,
                ':special_requirements' => $specialRequirements,
                ':status' => 'pending',
                ':business_id' => $businessId,
                ':owner_id' => $ownerId
            ]);
            
            // Handle materials
            if (!empty($materials)) {
                // First clear existing materials
                $clearStmt = $pdo->prepare("DELETE FROM business_materials WHERE business_id = ?");
                $clearStmt->execute([$businessId]);
                
                // Insert new materials
                $materialStmt = $pdo->prepare("INSERT INTO business_materials (business_id, material_type)
                    VALUES (:business_id, :material_type)");
                
                foreach ($materials as $material) {
                    $materialStmt->execute([
                        ':business_id' => $businessId,
                        ':material_type' => htmlspecialchars(trim($material))
                    ]);
                }
            }
            
            $pdo->commit();
            
            // Update session
            $_SESSION['owner']['business_id'] = $businessId;
            $_SESSION['success'] = 'Your shop "'.htmlspecialchars($businessName).'" has been submitted for approval!';
            header('Location: ../Owner Registration/pending-approval.php');
            exit();
            
        } catch (PDOException $e) {
            $pdo->rollBack();
            error_log("Business creation error: " . $e->getMessage());
            $errors['database'] = 'Failed to create business. Please try again.';
            
            // Clean up uploaded file if transaction failed
            if ($logoPath && file_exists($logoPath)) {
                unlink($logoPath);
            }
            
            $_SESSION['errors'] = $errors;
            $_SESSION['old'] = $_POST;
            header('Location: ../Owner Registration/shopsignup.php');
            exit();
        }
    } else {
        $_SESSION['errors'] = $errors;
        $_SESSION['old'] = $_POST;
        header('Location: ../Owner Registration/shopsignup.php');
        exit();
    }
}

// OWNER SIGNIN PROCESS (keep existing sign-in code)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ownersignin'])) {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // Basic validation
    if (empty($email)) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }

    if (empty($password)) {
        $errors['password'] = 'Password is required';
    }

    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header('Location: ../Owner Registration/owner_sign_in.php');
        exit();
    }

    try {
        // First check if it's an admin
        $stmt = $pdo->prepare("SELECT admin_id, email, password_hash, first_name, last_name 
            FROM admins 
            WHERE email = :email AND status = 'active'
        ");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin && password_verify($password, $admin['password_hash'])) {
            // It's an admin - redirect to admin dashboard
            session_regenerate_id(true);
            
            $_SESSION['admin'] = [
                'id' => $admin['admin_id'],
                'email' => $admin['email'],
                'firstName' => htmlspecialchars($admin['first_name']),
                'lastName' => htmlspecialchars($admin['last_name']),
                'last_login' => time()
            ];
            
            // Update last login time
            $updateStmt = $pdo->prepare("UPDATE admins SET last_login = NOW() WHERE admin_id = :id");
            $updateStmt->execute(['id' => $admin['admin_id']]);
            
            header('Location: ../Admin Profile/Admin.php');
            exit();
        }

        // If not admin, check owners table
        $stmt = $pdo->prepare("SELECT owner_id, email, password_hash, first_name, last_name, phone, created_at, status, business_id
            FROM owners 
            WHERE email = :email
        ");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $owner = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($owner) {
            if (password_verify($password, $owner['password_hash'])) {
                // Check if account is active or approved
                if (!in_array($owner['status'], ['approved', 'active'])) {
                    $errors['login'] = 'Your account is not yet approved or is inactive. Please contact support.';
                } else {
                    session_regenerate_id(true);
                    
                    $_SESSION['owner'] = [
                        'id' => $owner['owner_id'],
                        'email' => $owner['email'],
                        'firstName' => htmlspecialchars($owner['first_name']),
                        'lastName' => htmlspecialchars($owner['last_name']),
                        'phone' => htmlspecialchars($owner['phone']),
                        'created_at' => $owner['created_at'],
                        'business_id' => $owner['business_id'],
                        'last_login' => time(),
                        'is_owner' => true  
                    ];
                    
                    // Update last login time
                    $updateStmt = $pdo->prepare("UPDATE owners SET last_login = NOW() WHERE owner_id = :id");
                    $updateStmt->execute(['id' => $owner['owner_id']]);
                    
                    // Redirect based on business status
                    if ($owner['business_id']) {
                        $businessStmt = $pdo->prepare("SELECT status FROM businesses WHERE business_id = ?");
                        $businessStmt->execute([$owner['business_id']]);
                        $business = $businessStmt->fetch();
                        
                        if ($business['status'] === 'pending_setup') {
                            header('Location: ../Owner Registration/shopsignup.php');
                        } elseif ($business['status'] === 'pending') {
                            header('Location: ../Owner Registration/pending-approval.php');
                        } else {
                            header('Location: ../Owner Dashboard/owner_dashboard.php');
                        }
                    } else {
                        header('Location: ../Owner Dashboard/owner_dashboard.php');
                    }
                    exit();
                }
            } else {
                $errors['login'] = 'Invalid email or password';
            }
        } else {
            $errors['login'] = 'Invalid email or password';
        }
    } catch(PDOException $e) {
        error_log("Owner login error: " . $e->getMessage());
        $errors['system'] = 'System error. Please try again.';
    }
    
    // Handle errors
    $_SESSION['errors'] = $errors;
    header('Location: ../Owner Registration/owner_sign_in.php');
    exit();
}