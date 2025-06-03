<?php
session_start();
if(!isset($_SESSION['user'])){
    header("Location: index.php");
    exit();
}

// Get search term if it exists
$searchTerm = isset($_GET['search']) ? strtolower(trim($_GET['search'])) : '';
?>


<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard - JunkHub</title>
  <link rel="stylesheet" href="junkhub.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

</head>
<body>

  <div class="sidebar"> 
    <button class="sidebar-toggle">
    <i class="fas fa-arrow-left"></i>
  </button>

    <img src="./pngs/Logoo.png" alt="Logo" onclick="window.location.href='../Landing Page/landingpage.html'" style="cursor: pointer;">
    <h1 class="brand-name">
      <span class="text-gold">Junk</span><span class="text-black">HUB</span>
    </h1>
    <div class="circle1"></div>
    <div class="circle2"></div>

    
  </div>

  <div class="header">
  
      <div class="search-underline"></div>

      <a href="../User Profile/profile.html">
     <div class="profile-icon">
        <img src="./pngs/prof.png" alt="Profile">
      </div>
      </a>
    

    <a href="../Cart/Cart.html">
    <div class="Cart-icon">
      <i class="fas fa-shopping-cart"></i>
        <span class="cart-icon-badge">0</span>
    </div>
    </a>



    

      <div class="notification-icon">
        <i class="fas fa-bell"></i>  
        <span class="badge"></span>
      </div>

<div class="message-icon">
  <i class="fas fa-envelope"></i>
  <span class="message-badge"></span>
</div>

<form class="search-container" method="get" action="">
  <input type="text" name="search" placeholder="Search..." value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>">
  <button type="submit" style="display: none;"></button>
</form>


  <div class="logo">
    <img src="./pngs/Logo.png" alt="Logo">
  </div>

      <h1 class="brand-nameh">
      <span class="text-goldh">Junk</span><span class="text-blackh">HUB</span>
    </h1>


      <div class="category-wrapper">

        <a href="../Dashboard/junkhub.html">
        <div class="home-cat">
          <i class="fas fa-home"></i>
          <span>Home Page</span>
        </div>
        </a>
        
        <div class="shop-cat">
          <i class="fas fa-store"></i>
          <span>Shop</span>
        </div>

        <div class="products-cat">
          <i class="fas fa-box"></i>
          <span>Products</span>
        </div>

      </div>

      <div class="search-container"> 
        <input type="text" placeholder="Search...">
      </div>
  

      <div class="search-underline">
      </div>
 
      
<!-- Notification Panel -->
<!-- Update the notification panel section -->
<div class="notification-panel" id="notificationPanel">
  <div class="notification-header">
    <span>Notifications</span>
    <span class="close-notifications" id="closeNotifications">&times;</span>
  </div>
  <div class="notification-filters">
    <button class="notification-filter active" data-filter="all">All</button>
    <button class="notification-filter" data-filter="unread">Unread</button>
  </div>
  <div class="notification-items">
    <div class="notification-item unread">
      <div>New message from Shop A</div>
      <div class="notification-time">2 hours ago</div>
    </div>
    <div class="notification-item unread">
      <div>Your order has been shipped</div>
      <div class="notification-time">1 day ago</div>
    </div>
    <div class="notification-item">
      <div>Weekly newsletter</div>
      <div class="notification-time">3 days ago</div>
    </div>
  </div>
</div>



<!-- Messenger Sidebar -->
<div class="messenger-panel" id="messengerPanel">
  <div class="messenger-header">
    <span>Messages</span>
    <span class="close-messenger" id="closeMessenger">&times;</span>
  </div>
  <div class="messenger-filters">
    <button class="messenger-filter active" data-filter="all">All</button>
    <button class="messenger-filter" data-filter="unread">Unread</button>
  </div>
  <div class="messenger-items">
    <div class="messenger-item unread">
      <div class="messenger-avatar">
        <img src="./pngs/prof.png" alt="User">
      </div>
      <div class="messenger-content">
        <div class="messenger-sender">Shop A</div>
        <div class="messenger-preview">Hello, about your order...</div>
        <div class="messenger-time">2 hours ago</div>
      </div>
    </div>
    <div class="messenger-item">
      <div class="messenger-avatar">
        <img src="./pngs/prof.png" alt="User">
      </div>
      <div class="messenger-content">
        <div class="messenger-sender">Shop B</div>
        <div class="messenger-preview">Your item is ready for pickup</div>
        <div class="messenger-time">1 day ago</div>
      </div>
    </div>
    <div class="messenger-item">
      <div class="messenger-avatar">
        <img src="./pngs/prof.png" alt="User">
      </div>
      <div class="messenger-content">
        <div class="messenger-sender">Shop C</div>
        <div class="messenger-preview">Thank you for your purchase</div>
        <div class="messenger-time">3 days ago</div>
      </div>
    </div>
  </div>
</div>







</div>   
 
 
<div class="mainbg">

  <div class="shop-section">

  <h2 style="font-weight: 600; margin-left: 60px;">Most Viewed Shops</h2>
  
  <div class="arrow-container">
  <div class="arrow left" id="prev">&#10094;</div> 
  <div class="arrow right" id="next">&#10095;</div> 
  </div> 

  <div class="slider">

    <a href="../Error Page/404.html">
    <div class="slides" id="slides">
      <div class="slide">
        <img src="./pngs/shop-1.jfif" alt="Shop 1" class="clickable-slide" />
      </div>
      <div class="slide">
        <img src="./pngs/shop-2.jpg" alt="Shop 2" class="clickable-slide" />
      </div>
      <div class="slide">
        <img src="./pngs/Shop-3.jpg" alt="Shop 3" class="clickable-slide" />

      </div>
    
    </div>

  </div>
    </a>

     <div class="indicators">
    <span class="dot active"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>

  </div>



  <div class="underline-divider1">
  </div>


<div class="product-section">


    <h2 style="font-weight: 600; margin-left: 60px;">Recommended Items</h2>

        <div class="container0-wrapper">

    <div class="product-container0" data-name="Working TV" data-price="₱2000.00" data-available="Available Pieces: 2" data-shop="ⓘ Shop Name" data-img="./pngs/workingtv.png">
      <div class="text1">Working TV</div>
      <div class="text2">₱2000.00</div>
      <div class="text3">Available Pieces: 2</div>
      <div class="text4">ⓘ Shop Name</div>
        <img src="./pngs/workingtv.png" alt="workingtv" style="width: 200px; height: 200px; border-radius: 5px; margin-right: 10px">  
      </div>

      <div class="product-container0" data-name="Chair" data-price="₱30.00" data-available="Available Pieces: 6" data-shop="ⓘ Shop Name" data-img="./pngs/chair.jpg">
      <div class="text1">Chair</div>
      <div class="text2">₱30.00</div>
      <div class="text3">Available Pieces: 6</div>
      <div class="text4">ⓘ Shop Name</div>
        <img src="./pngs/chair.jpg" alt="workingtv" style="width: 200px; height: 200px; border-radius: 5px">
      </div>

      <div class="product-container0" data-name="Table" data-price="₱70.00" data-available="Available Pieces: 4" data-shop="ⓘ Shop Name" data-img="./pngs/table.jfif">
      <div class="text1">Table</div>
      <div class="text2">₱70.00</div>
      <div class="text3">Available Pieces: 4</div>
      <div class="text4">ⓘ Shop Name</div>
        <img src="./pngs/table.jfif" alt="workingtv" style="width: 200px; height: 200px; border-radius: 5px">
      </div>

            </div>

     </div>

      <div class="underline-divider1">
      </div>


<div class="shops-section">
  <h2 style="font-weight: 600; margin-left: 60px;">Shops</h2>
  
  <div class="shops-wrapper">
    <!-- Shop containers will be added dynamically by JavaScript -->
  </div>
</div>

<div class="underline-divider1"></div>

<div class="product-section" id="shop-items-section">
  <h2 style="font-weight: 600; margin-left: 60px;">Shop Items</h2>
  
  <div class="product-wrapper" id="shop-items-container">
    <!-- Shop-specific items will be loaded here when a shop is clicked -->
  </div>
</div>
                </div> 
  
                

 <div class="overlay" id="overlay">
  <div class="popup">
    
  <div class="popup-left">
    <img id="popup-img" src="" alt="product image">
    <h2 id="popup-name"></h2>
    <p id="popup-price"></p>
    <p id="popup-available"></p>
    <p id="popup-shop-name"></p>
  </div>

  <div class="popup-right">
    <div class="description-box">
      <h3>Description</h3>
      <p id="popup-description">No description available.</p>
    </div>

<button class="back-button" id="back-button">Back</button>

    <div class="button-group">

      <button class="sell-now">
     Sell <i class="fas fa-sack-dollar"></i>
  </button>

  <button class="buy-now">
    Buy <i class="fas fa-hand-holding-usd"></i> 
  </button>

<button class="add-to-cart"> 
  Add to <i class="fas fa-shopping-cart"></i>
</button>


</div>

  </div>
</div>

</div>


 <script src="junkhub.js"></script>
</body>
</html>