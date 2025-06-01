<?php
require_once '../Backend/dbconnect.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['errors']['email'] = 'Invalid email format';
        header('Location: forgot_password.php');
        exit();
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();
        
        if ($user) {
            $token = bin2hex(random_bytes(32));
            $expiry = date('Y-m-d H:i:s', time() + 3600); // 1 hour expiry
            
            $stmt = $pdo->prepare("UPDATE users SET reset_token = :token, reset_expiry = :expiry WHERE id = :id");
            $stmt->execute([
                'token' => password_hash($token, PASSWORD_BCRYPT),
                'expiry' => $expiry,
                'id' => $user['id']
            ]);
            
            // In production, you would send an email with this link:
            $resetLink = "https://yourdomain.com/reset-password.php?token=" . $token . "&id=" . $user['id'];
            // mail($email, "Password Reset", "Click here to reset: " . $resetLink);
            
            $_SESSION['success'] = 'Password reset link has been sent to your email';
        } else {
            $_SESSION['errors']['email'] = 'Email not found';
        }
    } catch (PDOException $e) {
        error_log("Password reset error: " . $e->getMessage());
        $_SESSION['errors']['system'] = 'An error occurred';
    }
    
    header('Location: forgot_password.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - JunkHUB</title>
    <link rel="icon" type="image/pnglogo" href="../Images/teallogo22619-foad-200h.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="forgot_pass.css">
</head>
<body>
    <main class="login-container">
        <div class="login-wrapper">
            <section class="form-panel">
                <h2 class="form-title">Forgot Password</h2>
                
                <p class="reset-instructions">Enter your email address and we'll send you a link to reset your password.</p>
                
                <?php if (isset($_SESSION['success'])): ?>
                    <div class="success-message">
                        <p><?php echo $_SESSION['success']; unset($_SESSION['success']); ?></p>
                    </div>
                <?php endif; ?>
                
                <?php if (isset($_SESSION['errors']['email'])): ?>
                    <div class="error-main">
                        <p><?php echo $_SESSION['errors']['email']; unset($_SESSION['errors']['email']); ?></p>
                    </div>
                <?php endif; ?>
                
                <form method="POST" class="reset-form">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email address" required>
                    </div>
                    
                    <button type="submit" class="reset-button">Send Reset Link</button>
                    
                    <p class="signup-link">
                        Remember your password? <a href="../Sign In/sign_in.php" class="highlight-link">Sign in here</a>
                    </p>
                </form>
            </section>

        </div>
    </main>
</body>
</html>