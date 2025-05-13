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

// Regenerate ID for security
if (!isset($_SESSION['initiated'])) {
    session_regenerate_id();
    $_SESSION['initiated'] = true;
}

// Handle flash messages
$errors = $_SESSION['errors'] ?? [];
$old = $_SESSION['old'] ?? [];
$success = $_SESSION['success'] ?? null;

// Clear all flash data
unset($_SESSION['errors'], $_SESSION['old'], $_SESSION['success']);

// Set default array if not exists
$errors = is_array($errors) ? $errors : [];
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sign up for JunkHUB - Create your account today">
    <title>Sign Up - JunkHUB</title>
    <link rel="icon" type="image/pnglogo" href="../Images/teallogo22619-foad-200h.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  </head>
  <body>
    <main class="sign-up-container">
      <div class="sign-up-wrapper">
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
            <h2 class="welcome-title">Welcome to JunkHub!</h2>
            <p class="welcome-text">
              To keep connected with us please sign up with your personal information
            </p>
          </div>
          
          <!-- Decorative elements -->
          <div class="decorative-elements" aria-hidden="true">
            <div class="deco-rect-1"></div>
            <div class="deco-rect-2"></div>
          </div>
        </section>
        
        <!-- Right panel - Sign up form -->
        <section class="form-panel">
          <h2 class="form-title">Sign Up</h2> 
        <?php
        if (isset($errors['user_exist'])) {
          echo '<div class="error-main">
            <p>' . $errors['user_exist'] . '</p></div>';
        }
        ?>
          <form id="signup-form" class="signup-form" method="POST" action="../Backend/user-account.php" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" placeholder="ex. Chidrick" value="<?= htmlspecialchars($old['firstName'] ?? '') ?>" required>
                <!--error validation of fname -->
                <?php
                if(isset($errors['firstName'])){
                  echo '<div class="error"> <p>'. $errors['firstName'] . '</p></div>';
                }
                ?>
              </div>
              
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" placeholder="ex. Galario" value="<?= htmlspecialchars($old['lastName'] ?? '') ?>" required>
                <!--error validation of fname -->
                <?php
                  if(isset($errors['lastName'])){
                    echo '<div class="error"> <p>'. $errors['lastName'].'</p></div>';
                  }
                ?>
              </div>
            </div>
            
            <div class="form-group">
              <label for="contactNumber">Contact Number:</label>
              <input type="tel" id="contactNumber" name="contactNumber" placeholder="ex. 09123456789" pattern="[0-9]+" value="<?= htmlspecialchars($old['contactNumber'] ?? '') ?>" required>
              <?php
                if(isset($errors['contactNumber'])){
                  echo '<div class="error"> <p>'. $errors['contactNumber'].'</p></div>';
                }
              ?>
            </div>
            
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="ex. your@email.com" value="<?= htmlspecialchars($old['email'] ?? '') ?>" required>
              <?php
                if(isset($errors['email'])){
                  echo '<div class="error"> <p>'. $errors['email'].'</p></div>';
                }
              ?>
            </div>
            
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Create a secure password" required minlength="12">
              <i class="fa fa-eye" id="eye" aria-label="Show password" role="button"></i>
              <?php
                if(isset($errors['password'])){
                  echo '<div class="error"> <p>'. $errors['password'].'</p></div>';
                }
              ?>
            </div>

            <ul class="passreq" aria-label="Password requirements">
              <li>At least 12 characters long.</li>
              <li>Include uppercase (A-Z) and lowercase (a-z) letters.</li>
              <li>Include numbers (0-9).</li>
            </ul>

            <div class="form-group">
              <label for="confirm_password">Confirm Password:</label>
              <input type="password" id="confirm_password" name="confirm_password" placeholder="Create a secure password" required>
              <?php
                if(isset($errors['confirm_password'])){
                  echo '<div class="error"> <p>'. $errors['confirm_password'].'</p></div>';
                }
              ?>
            </div>

            <div class="form-group checkbox-group">
              <input type="checkbox" id="terms" name="terms" required>
              <label for="terms">
                By creating an account, you agree to our <a href="#" class="link">Terms of Use</a> and <a href="#" class="link">Privacy Policy</a>.
              </label>
            </div>
            <?php
                if(isset($errors['terms'])){
                  echo '<div class="error"> <p>'. $errors['terms'].'</p></div>';
                }
              ?>
            
            <button type="submit" class="signup-button" name="signup" value="SIGN UP">SIGN UP</button>
            
            <p class="login-link">
              Already have an account? <a href="../Sign In/sign_in.php" class="highlight-link">Login here</a>
            </p>
          </form>
        </section>
      </div>
    </main>
    <script src="toogle.js" defer></script>
  </body>
</html>

<?php
if(isset($_SESSION['errors'])){
    unset($_SESSION['errors']);
}
?>