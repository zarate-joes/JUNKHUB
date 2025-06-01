<?php
session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'domain' => $_SERVER['HTTP_HOST'],
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict'
]);
session_start();
if (isset($_SESSION['errors'])) {
  $errors = $_SESSION['errors'];
}

if (isset($_SESSION['success'])) {
  $success = $_SESSION['success'];
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Login to JunkHUB - Access your account">
    <title>Sign In - JunkHUB</title>
    <link rel="icon" type="image/pnglogo" href="../Images/teallogo22619-foad-200h.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../Sign Up/reset.css">
    <link rel="stylesheet" href="sign_in.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  </head>
  <body>
    <main class="login-container">
      <div class="login-wrapper">
        <!-- Left panel -->
        <section class="left-panel">
          <a href="../Landing Page/index.php" class="brand-link">
            <div class="brand">
              <img src="../Images/teallogo22619-foad-200h.png" alt="JunkHUB Logo" class="brand-logo">
              <h1 class="brand-name">
                <span class="brand-highlight">Junk</span>HUB
              </h1>
            </div>
          </a>
          
          <div class="welcome-content">
            <h2 class="welcome-title">Welcome Back!</h2>
            <p class="welcome-text">
              Log in with your credentials to access your account and manage your junk removal services
            </p>
          </div>
          
          <!-- Decorative elements -->
          <div class="decorative-elements" aria-hidden="true">
            <div class="deco-rect-1"></div>
            <div class="deco-rect-2"></div>
          </div>
        </section>
        
        <!-- Right panel - Login form -->
        <section class="form-panel">
          <h2 class="form-title">Login</h2>

          <?php
            if (isset($success['success'])) {
              echo '<div class="success-message"><p>' . $success['success'] . '</p></div>';
              unset($success['success']);
            }
          ?>

          <?php
            if (isset($errors['login'])) {
              echo '<div class="error-main"><p>' . $errors['login'] . '</p></div>';
              unset($errors['login']);
            }
          ?>

          <form id="login-form" class="login-form" method="POST" action="../Backend/user-account.php" novalidate>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" required>
              <?php
                if (isset($errors['email'])) {
                  echo ' <div class="error"> <p>' . $errors['email'] . '</p></div>';
                }
              ?>
            </div>
            
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required>
              <i class="fa fa-eye" id="eye" aria-label="Show password" role="button"></i>
              <?php
                if (isset($errors['password'])) {
                  echo ' <div class="error"><p>' . $errors['password'] . '</p></div>';
                }
              ?>
            </div>

            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="remember" name="remember" value="1">
                <label for="remember">Remember me</label>
              </div>
              <a href="forgot_password.php" class="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" class="login-button" name="signin" value="LOGIN">LOGIN</button>
            
            <p class="signup-link">
              Don't have an account? <a href="../Sign Up/sign_up.php" class="highlight-link">Sign up here</a>
            </p>
          </form>
        </section>
      </div>
    </main>
    <script src="../Sign Up/toogle.js" defer></script>
  </body>
</html>

<?php
if (isset($_SESSION['errors'])) {
  unset($_SESSION['errors']);
}
?>