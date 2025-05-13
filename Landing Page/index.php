<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JunkHub - Turn Your Junk Into Treasure</title>
  <meta name="description" content="JunkHub helps you sell items you no longer need. A man's junk is another man's treasure.">
  <link rel="icon" type="image/png" href="../Images/teallogo22619-foad-200h.png">
  
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" as="style">
  <link rel="preload" href="./index.css" as="style">
  <link rel="preload" href="../Images/Landing Page.png" as="image" media="(min-width: 768px)">
  
  <link rel="preload" href="../Images/Landing Page-mobile.png" as="image" media="(max-width: 767px)">
  
  <!-- CSS with media queries -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap"></noscript>
  <link rel="stylesheet" href="./index.css">
  
  <!-- Add meta tags for social sharing -->
  <meta property="og:title" content="JunkHub - Turn Your Junk Into Treasure">
  <meta property="og:description" content="Sell items you no longer need. A man's junk is another man's treasure.">
  <meta property="og:image" content="../Images/social-share.jpg">
  <meta property="og:url" content="https://yourdomain.com">
  <meta name="twitter:card" content="summary_large_image">
</head>
<body>
  <div class="page-loader" aria-hidden="true"></div>
  
  <main class="landing-page">
    <section class="hero-section">
      <div class="hero-container">
        <header class="site-header">
          <div class="logo-container">
            <img class="logo" src="../Images/teallogo22619-foad-200h.png" 
                 alt="JunkHub logo" 
                 width="80" height="80"
                 loading="eager">
            <h1 class="brand-name">
              <span class="text-gold">Junk</span><span class="text-black">HUB</span>
            </h1>
          </div>
          
          <button class="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="main-nav">
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
          </button>
          
          <nav id="main-nav" aria-label="Main navigation">
            <a href="../Error Page/404.html" class="nav-button contact-button">Contact Us</a>
            <a href="../Sign Up/prompt.html" class="nav-button signup-button">Sign up</a>
            <a href="../Sign In/prompt.html" class="nav-button signin-button">Sign in</a>
            <a href="../Error Page/404.html" class="nav-button about-button">About</a>
          </nav>
        </header>

        <div class="hero-content">
          <h2 class="hero-title">A man's Junk is</h2>
          <h3 class="hero-subtitle">
            <span class="text-black">Another man's </span>
            <span class="text-gold">Treasure</span>
            <span class="text-black">.</span>
          </h3>
          
          <div class="divider-line" role="separator" aria-hidden="true"></div>
          
          <p class="hero-description">We're Here To Make Your Life Easier.</p>
          
          <div class="cta-container">
            <a href="../Owner Sign-up/shopsignup.html" class="cta-button">
              Start Selling
            </a>
          </div>
        </div>
      </div>
      
      <div class="accent-bar" aria-hidden="true"></div>
    </section>
    
    <!-- Additional sections would go here -->
    <section id="how-it-works" class="info-section">
      <!-- Content would be added here -->
    </section>
  </main>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Remove page loader
      const pageLoader = document.querySelector('.page-loader');
      if (pageLoader) {
        pageLoader.remove();
      }
      
      // Mobile menu functionality
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const nav = document.getElementById('main-nav');
      const overlay = document.createElement('div');
      overlay.classList.add('menu-overlay');
      document.body.appendChild(overlay);
      
      function toggleMenu() {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Add focus trapping when menu is open
        if (!isExpanded) {
          const firstLink = nav.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      }
      
      mobileMenuToggle.addEventListener('click', toggleMenu);
      overlay.addEventListener('click', toggleMenu);
      
      // Close menu when clicking on nav links
      document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) toggleMenu();
        });
      });
      
      // Close menu on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
          toggleMenu();
          mobileMenuToggle.focus();
        }
      });
    });
  </script>
</body>
</html>