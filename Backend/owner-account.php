<?php
require_once 'dbconnect.php'; 

session_start();
$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])) {
    // Input sanitization
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $firstName = htmlspecialchars(trim($_POST['firstName']));
    $lastName = htmlspecialchars(trim($_POST['lastName']));
    $contactNumber = preg_replace('/\D/', '', $_POST['contactNumber']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $created_at = date('Y-m-d H:i:s');

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

    // Check for existing owner
    $stmt = $pdo->prepare('SELECT owner_id FROM owners WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if($stmt->fetch()){
        $errors['owner_exist'] = 'This email is already registered as an owner';
    }

    // If no errors, proceed with registration
    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        try {
            $pdo->beginTransaction();

            // Insert owner WITHOUT business_id (MODIFIED)
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

            $pdo->commit();

            // Set success message (MODIFIED)
            $_SESSION['success'] = 'Owner account created successfully! You can now login.';
            header('Location: ../Owner Registration/shopsignup.php');
            exit();

        } catch (PDOException $e) {
            $pdo->rollBack();
            error_log('Database error: ' . $e->getMessage());
            
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


// For owner sign in (simplified version)
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
         // Check owners table
        $stmt = $pdo->prepare("SELECT owner_id, email, password_hash, first_name, last_name, created_at
            FROM owners 
            WHERE email = :email
        ");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        
        $owner = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($owner) {
            if (password_verify($password, $owner['password_hash'])) {
                session_regenerate_id(true);
                
                // Only store owner info in session
                $_SESSION['owner'] = [
                    'id' => $owner['owner_id'],
                    'email' => $owner['email'],
                    'firstName' => htmlspecialchars($owner['first_name']),
                    'lastName' => htmlspecialchars($owner['last_name']),
                    'created_at' => $owner['created_at'],
                    'last_login' => time(),
                    'is_owner' => true  
                ];
                
                
                header('Location: ../Owner Dashboard/owner_dashboard.php');
                exit();
            }
        }
        
        // Generic error message to prevent email enumeration
        $errors['login'] = 'Invalid email or password';
        
    } catch(PDOException $e) {
        error_log("Owner login error: " . $e->getMessage());
        $errors['system'] = 'System error. Please try again.';
    }
    
    // Handle errors
    $_SESSION['errors'] = $errors;
    header('Location: ../Owner Registration/owner_sign_in.php');
    exit();
}