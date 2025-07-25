<?php
require_once 'dbconnect.php'; 

session_start();
$errors = [];

//---------For user sign up--------------
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

    if ($hasError) {
        $errors['password'] = 'Password does not meet requirements';
    }

    if($password !== $confirm_password) {
        $errors['confirm_password'] = 'Passwords do not match';
    }

    if(!isset($_POST['terms'])) {
        $errors['terms'] = 'You must agree to the terms and conditions';
    }

    // Check for existing user (updated table name)
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if($stmt->fetch()){
        $errors['user_exist'] = 'Email is already registered';
    }

    if(!empty($errors)) {
        $_SESSION['errors'] = $errors;
        $_SESSION['old'] = $_POST; 
        header('Location: ../Sign Up/sign_up.php'); 
        exit();
    }

    // Insert user (updated column names)
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    try {
        $stmt = $pdo->prepare('INSERT INTO users 
            (email, password_hash, first_name, last_name, phone, created_at, remember_token) 
            VALUES(:email, :password, :firstName, :lastName, :contactNumber, :created_at, :remember_token)');

        $stmt->execute([
            'email' => $email,
            'password' => $hashedPassword,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'contactNumber' => $contactNumber,
            'created_at' => date('Y-m-d'), // Matches DATE type in DB
            'remember_token' => '' // Empty string for now
        ]);
        
        $_SESSION['success'] = 'Registration successful! Please login.';
        error_log("About to redirect to sign_in.php");
        header('Location: ../Sign In/sign_in.php'); 
        exit();
    } catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());
        error_log('SQL State: ' . $e->getCode());
        error_log('Query: ' . $stmt->queryString);
        $errors['database'] = 'An error occurred during registration. Please try again.';
        $_SESSION['errors'] = $errors;
        $_SESSION['old'] = $_POST;
        header('Location: ../Sign Up/sign_up.php');
        exit();
        }
}

//---------For user sign in--------------
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
        // 2. Prepared statement with strict validation (updated column names)
        $stmt = $pdo->prepare("SELECT user_id, email, password_hash, first_name, last_name, created_at 
            FROM users 
            WHERE email = :email
        ");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // 3. Secure authentication flow
        if ($user) {
            if (password_verify($password, $user['password_hash'])) {
                session_regenerate_id(true);
                $_SESSION['user'] = [
                    'id' => $user['user_id'], // Updated column name
                    'email' => $user['email'],
                    'firstName' => htmlspecialchars($user['first_name']), // Updated column name
                    'lastName' => htmlspecialchars($user['last_name']), // Updated column name
                    'created_at' => $user['created_at'],
                    'last_login' => time()
                ];
                
                header("Cache-Control: no-store");
                header('Location: ../Dashboard/junkhub.php');
                exit();
            }
        }
        
        // 4. Generic error message
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

// For remember me functionality
if (!isset($_SESSION['user']) && isset($_COOKIE['remember'])) {
    list($userId, $token) = explode(':', $_COOKIE['remember']);
    
    try {
        $stmt = $pdo->prepare("
            SELECT user_id, remember_token, token_expiry 
            FROM users 
            WHERE user_id = :id
        ");
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch();
        
        if ($user && strtotime($user['token_expiry']) > time() && password_verify($token, $user['remember_token'])) {
            // Valid token - log the user in
            $stmt = $pdo->prepare("
                SELECT user_id, email, first_name, last_name, created_at 
                FROM users 
                WHERE user_id = :id
            ");
            $stmt->execute(['id' => $userId]);
            $userData = $stmt->fetch();
            
            session_regenerate_id(true);
            $_SESSION['user'] = [
                'id' => $userData['user_id'],
                'email' => $userData['email'],
                'firstName' => htmlspecialchars($userData['first_name']),
                'lastName' => htmlspecialchars($userData['last_name']),
                'created_at' => $userData['created_at'],
                'last_login' => time()
            ];
            
            // Refresh the cookie
            setcookie('remember', $_COOKIE['remember'], time() + 60 * 60 * 24 * 30, '/', '', true, true);
        } else {
            // Invalid token - clear cookie
            setcookie('remember', '', time() - 3600, '/');
        }
    } catch (PDOException $e) {
        error_log("Remember me auto-login error: " . $e->getMessage());
    }
}

// Then modify the sign-in section to handle remember me
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signin'])) {
    // ... existing email/password validation code ...

    try {
        $stmt = $pdo->prepare("
            SELECT user_id, email, password_hash, first_name, last_name, created_at 
            FROM users 
            WHERE email = :email
        ");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($password, $user['password_hash'])) {
                session_regenerate_id(true);
                
                $_SESSION['user'] = [
                    'id' => $user['user_id'],
                    'email' => $user['email'],
                    'firstName' => htmlspecialchars($user['first_name']),
                    'lastName' => htmlspecialchars($user['last_name']),
                    'created_at' => $user['created_at'],
                    'last_login' => time()
                ];
                
                // Handle remember me
                if (isset($_POST['remember'])) {
                    $token = bin2hex(random_bytes(32));
                    $expiry = time() + 60 * 60 * 24 * 30; // 30 days
                    
                    $stmt = $pdo->prepare("
                        UPDATE users 
                        SET remember_token = :token, token_expiry = :expiry 
                        WHERE user_id = :id
                    ");
                    $stmt->execute([
                        'token' => password_hash($token, PASSWORD_BCRYPT),
                        'expiry' => date('Y-m-d H:i:s', $expiry),
                        'id' => $user['user_id']
                    ]);
                    
                    setcookie('remember', $user['user_id'] . ':' . $token, $expiry, '/', '', true, true);
                }
                
                header("Cache-Control: no-store");
                header('Location: ../Dashboard/junkhub.php');
                exit();
            }
        }
        
        $errors['login'] = 'Invalid credentials';
        
    } catch(PDOException $e) {
        error_log("Login error: " . $e->getMessage());
        $errors['system'] = 'System error';
    } finally {
        if (!empty($errors)) {
            $_SESSION['errors'] = $errors;
            header('Location: ../Sign In/sign_in.php');
            exit();
        }
    }
}
?>