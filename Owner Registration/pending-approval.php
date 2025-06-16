<?php
session_start();
// Check if there's a success message (meaning shop was created)
if (!isset($_SESSION['success'])) {
    header('Location: sign_in.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pending Approval - JunkHUB</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="icon" type="image/png" href="../Images/teallogo22619-foad-200h.png">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-primary: #FFE664;
            --color-primary-dark: #FFD700;
            --color-dark: #000000;
            --color-light: #ffffff;
            --font-family: 'Poppins', sans-serif;
        }
        
        body {
            font-family: var(--font-family);
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            text-align: center;
        }
        
        .approval-container {
            background: white;
            padding: 3rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 90%;
            margin: 2rem;
        }
        
        .approval-icon {
            font-size: 5rem;
            color: #FFD700;
            margin-bottom: 1.5rem;
        }
        
        h1 {
            color: var(--color-dark);
            margin-bottom: 1rem;
        }
        
        p {
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .btn {
            background-color: var(--color-primary);
            color: var(--color-dark);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn:hover {
            background-color: var(--color-primary-dark);
            transform: translateY(-2px);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .approval-icon {
            animation: pulse 2s infinite;
        }
    </style>
</head>
<body>
    <div class="approval-container">
        <div class="approval-icon">⏳</div>
        <h1>Thank You for Registering Your Shop!</h1>
        <p>Your shop registration is currently being reviewed for approval. This process typically takes 1-2 business days. You'll receive an email notification once your shop is approved and ready to go live.</p>
        <p>In the meantime, you can prepare your inventory and get ready to start accepting recyclable materials!</p>
        
        <?php if (isset($_SESSION['success'])): ?>
            <div style="background: #e8f5e9; color: #2e7d32; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
                <?php echo htmlspecialchars($_SESSION['success']); ?>
                <?php unset($_SESSION['success']); ?>
            </div>
        <?php endif; ?>
        
        <a href="../Landing Page/index.php" class="btn">Back to Home</a>
    </div>
</body>
</html>