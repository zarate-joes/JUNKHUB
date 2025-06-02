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
    <meta name="description" content="Owner Login to JunkHUB - Access your business account">
    <title>Owner Sign In - JunkHUB</title>
    <link rel="icon" type="image/pnglogo" href="../Images/teallogo22619-foad-200h.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="owner_sign_in.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  </head>
  <body>
    <main class="owner-login-container">
      <div class="owner-login-wrapper">
        <!-- Left panel -->
        <section class="owner-left-panel">
          <span class="owner-badge">Owner Portal</span>
          <a href="../Landing Page/index.php" class="owner-brand-link">
            <div class="owner-brand">
              <img src="../Images/teallogo22619-foad-200h.png" alt="JunkHUB Logo" class="owner-brand-logo">
              <h1 class="owner-brand-name">
                <span class="owner-brand-highlight">Junk</span>HUB
              </h1>
            </div>
          </a>
          
          <div class="owner-welcome-content">
            <h2 class="owner-welcome-title">Owner Access</h2>
            <p class="owner-welcome-text">
              Log in to manage your business operations, view analytics, and oversee your junk removal services
            </p>
          </div>
          
          <!-- Decorative elements -->
          <div class="owner-decorative-elements" aria-hidden="true">
            <div class="owner-deco-circle-1"></div>
            <div class="owner-deco-circle-2"></div>
          </div>
        </section>
        
        <!-- Right panel - Login form -->
        <section class="owner-form-panel">
          <h2 class="owner-form-title">Owner Login</h2>

          <?php
            if (isset($success['success'])) {
              echo '<div class="owner-success-message"><p>' . htmlspecialchars($success['success']) . '</p></div>';
              unset($success['success']);
            }
          ?>

          <?php
            if (isset($errors['login'])) {
              echo '<div class="owner-error-main"><p>' . htmlspecialchars($errors['login']) . '</p></div>';
              unset($errors['login']);
            }
          ?>

          <form id="login-form" class="owner-login-form" method="POST" action="../Backend/owner-account.php" novalidate>
            <div class="owner-form-group">
              <label for="email">Business Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your business email" required>
              <?php
                if (isset($errors['email'])) {
                  echo '<div class="owner-error-message"><p>' . htmlspecialchars($errors['email']) . '</p></div>';
                }
              ?>
            </div>
            
            <div class="owner-form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required>
              <i class="fa fa-eye owner-password-toggle" id="eye" aria-label="Show password" role="button"></i>
              <?php
                if (isset($errors['password'])) {
                  echo '<div class="owner-error-message"><p>' . htmlspecialchars($errors['password']) . '</p></div>';
                }
              ?>
            </div>

            <div class="owner-form-options">
              <div class="owner-remember-me">
                <input type="checkbox" id="remember" name="remember" value="1">
                <label for="remember">Remember me</label>
              </div>
              <a href="forgot_password.php?type=owner" class="owner-forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" class="owner-login-button" name="ownersignin" value="LOGIN">LOGIN</button>
            
            <p class="owner-signup-link">
              Need business account? <a href="owner_sign_up.php" class="owner-highlight-link">Click Here</a>
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