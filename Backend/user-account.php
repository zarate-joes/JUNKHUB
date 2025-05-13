<?php
require_once 'dbconnect.php'; 

session_start();
$errors = [];

require __DIR__ . '/dbconnect.php'; // Use absolute path
if (!isset($pdo)) {
    die("Database connection not established");
}

if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])){
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $contactNumber = preg_replace('/\D/', '', $_POST['contactNumber']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $created_at = date('Y-m-d H:i:s');
    $name = $firstName . ' ' . $lastName; 


    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email format';
    }

    if(empty($firstName)) {
        $errors['firstName'] = 'First name is required';
    }

    if(empty($lastName)) {
        $errors['lastName'] = 'Last name is required';
    }

    if(empty($contactNumber)) {
        $errors['contactNumber'] = 'Contact number is required';
    } elseif(!preg_match('/^09[0-9]{9}$/', $contactNumber)) {
        $errors['contactNumber'] = 'Please enter a valid Philippine mobile number (09XXXXXXXXX)';
    } else {
        // Standardize to 09 format if +639 was used
        $contactNumber = preg_replace('/^\+639/', '09', $contactNumber);
    }

        $hasError = false;

    // Length check
    if (strlen($password) < 12) {
        $errors['password_length'] = 'Password must be at least 12 characters long';
        $hasError = true;
    }

    // Uppercase check
    if (!preg_match('/[A-Z]/', $password)) {
        $errors['password_uppercase'] = 'Password must contain at least one uppercase letter (A-Z)';
        $hasError = true;
    }

    // Lowercase check
    if (!preg_match('/[a-z]/', $password)) {
        $errors['password_lowercase'] = 'Password must contain at least one lowercase letter (a-z)';
        $hasError = true;
    }

    // Number check
    if (!preg_match('/[0-9]/', $password)) {
        $errors['password_number'] = 'Password must contain at least one number (0-9)';
        $hasError = true;
    }

    if ($hasError) {
        $errors['password'] = 'Password does not meet requirements';
    }

    if($password !== $confirm_password) {
        $errors['confirm_password'] = 'Passwords do not match';
    }

    if(!isset($_POST['terms'])) {
        $errors['terms'] = 'You must agree to the terms and conditions';
    }

    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if($stmt->fetch()){
        $errors['user_exist'] = 'Email is already registered';
    }

    if(!empty($errors)) {
        $_SESSION['errors'] = $errors;
        $_SESSION['old'] = $_POST; // Store old input for repopulating form
        header('Location: ../Sign Up/sign_up.php'); // Adjust path as needed
        exit();
    }

    // Insert user
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    try {
    $stmt = $pdo->prepare('INSERT INTO users (email, password, firstName, lastName, contactNumber, created_at) VALUES(:email, :password, :firstName, :lastName, :contactNumber, :created_at)');
    $stmt->execute([
        'email' => $email,
        'password' => $hashedPassword,
        'firstName' => $firstName,
        'lastName' => $lastName,
        'contactNumber' => $contactNumber,
        'created_at' => $created_at
    ]);
    
    $_SESSION['success'] = 'Registration successful! Please login.';
    header('Location: ../Sign In/sign_in.php'); // Adjust path as needed
    exit();
    } catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());
        $errors['database'] = 'An error occurred during registration. Please try again.';
        $_SESSION['errors'] = $errors;
        $_SESSION['old'] = $_POST;
        header('Location: ../Sign Up/sign_up.php');
        exit();
    }
}

//for sign_in.php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signin'])) {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    if (empty($email)) {
        $errors['email'] = 'Email cannot be empty';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }

    if (empty($password)) {
        $errors['password'] = 'Password cannot be empty';
    }

    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header('Location: ../Sign In/sign_in.php');
        exit();
    }

    

    // 1. Connection check (with proper type verification)
    if (!isset($pdo) || !($pdo instanceof PDO)) {
        error_log("Critical: Database connection failed in login handler");
        $_SESSION['errors']['system'] = 'Service unavailable';
        header('Location: ../Sign In/sign_in.php');
        exit();
    }

    try {
        // 2. Prepared statement with strict validation
        $stmt = $pdo->prepare("SELECT id, email, password, firstName, lastName, created_at FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // 3. Secure authentication flow
        if ($user) {
            if (password_verify($password, $user['password'])) {
                // Regenerate session ID to prevent fixation
                session_regenerate_id(true);
                
                // Minimal session data
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'firstName' => htmlspecialchars($user['firstName']), // XSS protection
                    'lastName' => htmlspecialchars($user['lastName']),
                    'created_at' => $user['created_at'],
                    'last_login' => time() // Track activity
                ];
                
                // Security headers
                header("Cache-Control: no-store");
                header('Location: ../Dashboard/junkhub.php');
                exit();
            }
        }
        
        // 4. Generic error message (don't reveal which was wrong)
        $errors['login'] = 'Invalid credentials';
        
    } catch(PDOException $e) {
        error_log("Login error: " . $e->getMessage());
        $errors['system'] = 'System error';
    } finally {
        // 5. Always handle errors consistently
        if (!empty($errors)) {
            $_SESSION['errors'] = $errors;
            header('Location: ../Sign In/sign_in.php');
            exit();
        }
    }
    
}