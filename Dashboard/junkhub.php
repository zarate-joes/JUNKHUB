<?php
session_start();
if(isset($_SESSION['user'])){
    $user = $_SESSION['user'];

}else{
    header("Location: index.php");
    exit();
}

?>


<!DOCTYPE html>
<html>
<head>
  
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard - JunkHub</title>
  <link rel="stylesheet" href="junkhub.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="../Images/teallogo22619-foad-200h.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

</head>
<body>

  <div class="sidebar" onclick="window.location.href='../Dashboard/junkhub.html'" style="cursor: pointer;"> 
    <img src="./pngs/Logoo.png" alt="Logo">
    <img src="./pngs/JunkHub.png" alt="JunkHub" class="junkhub-img">
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>
  

  <div class="header">
   
    <div class="content">

      <div class="category-wrapper">

        <a href="../Landing Page/index.html">
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
  
      <div class="profile-icon">
        <img src="./pngs/prof.png" alt="Profile">
      </div>
  
      <div class="Cart-icon">
        <i class="fas fa-shopping-cart"></i>
      </div>

      <div class="notification-icon">
        <i class="fas fa-bell"></i>  
        <span class="badge">3</span>
      </div>

      <div class="search-underline">
      </div>
  
</div>   
</div>   


<div class="mainbg">

  <h2 style="font-weight: 600; margin-left: 60px;">Shops</h2>

  <div class="arrow left" id="prev">&#10094;</div> <!-- Left arrow -->
  <div class="arrow right" id="next">&#10095;</div> <!-- Right arrow -->

  <div class="indicators">
    <span class="dot active"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  
  <div class="slider">
    <div class="slides" id="slides">
      <div class="slide">
        <img src="./pngs/Shopt-1.png" alt="Shop 1" class="clickable-slide" />
      </div>
      <div class="slide">
        <img src="./pngs/Shop-2.png" alt="Shop 2" class="clickable-slide" />
      </div>
      <div class="slide">
        <img src="./pngs/Shop-3.jpg" alt="Shop 3" class="clickable-slide" />
      </div>
    </div>

  </div>

  <div class="underline-divider1">
  </div>

    <h2 style="font-weight: 600; margin-left: 60px;">Recommended Items</h2>

  
    <div class="product-container0">
      <div class="text1">Working TV</div>
      <div class="text2">₱2000.00</div>
      <div class="text3">Available Pieces: 2</div>
        <img src="./pngs/workingtv.png" alt="workingtv" style="width: 250px; height: 200px; border-radius: 4px">
      </div>

      <div class="underline-divider1">
      </div>

      <h2 style="font-weight: 600; margin-left: 60px;">Items</h2>

      <div class="product-wrapper">

      <div class="product-container" data-name="Aluminum Metal" data-price="₱150.09 per kg" data-available="Available: 500kg" data-img="./pngs/aluminum.png">
        <div class="product_name">Aluminum Metal</div>
         <div class="product-price">₱150.09 per kg</div>
         <div class="product-available">Available: 500kg</div>
          <img src="./pngs/aluminum.png" alt="aluminum" style="width: 200px; height: 200px; border-radius: 4px">
        </div>

          <div class="product-container" data-name="Plastic Bottles" data-price="₱26.01 per kg" data-available="Available: 1,000kg" data-img="./pngs/plastic.png">
            <div class="product_name">Plastic Bottles</div>
            <div class="product-price">₱26.01 per kg</div>
            <div class="product-available">Available: 1,000kg</div>
              <img src="./pngs/plastic.png" alt="plastic" style="width: 200px; height: 200px; border-radius: 4px">
            </div>

            <div class="product-container" data-name="Old Car Batteries" data-price="₱500 per unit" data-available="Available: 25units" data-img="./pngs/battery.png">
              <div class="product_name">Cardboard</div>
              <div class="product-price">₱34.12 per kg</div>
              <div class="product-available">Available: 350kg</div>
                <img src="./pngs/cardboard.png" alt="cardboard" style="width: 200px; height: 200px; border-radius: 4px" href>
              </div>

              <div class="product-container" data-name="Copper" data-price="₱123.90 per kg" data-available="Available: 500kg" data-img="./pngs/copper.png">
                <div class="product_name">Copper</div>
                <div class="product-price">₱123.90 per kg</div>
                <div class="product-available">Available: 500kg</div>
                  <img src="./pngs/copper.png" alt="copper" style="width: 200px; height: 200px; border-radius: 4px">
                </div>

                <div class="product-container" data-name="Old Car Batteries" data-price="₱500 per unit" data-available="Available: 25units" data-img="./pngs/battery.png">
                  <div class="product_name">Old Car Batteries</div>
                  <div class="product-price">₱500 per unit</div>
                  <div class="product-available">Available: 25units</div>
                    <img src="./pngs/battery.png" alt="battery" style="width: 200px; height: 200px; border-radius: 4px">
                  </div>

                  <div class="product-container" data-name="Scrap Metal - Steel" data-price="₱150.09 per kg" data-available="Available: 500kg" data-img="./pngs/steel.png">
                    <div class="product_name">Scrap Metal - Steel</div>
                    <div class="product-price">₱150.09 per kg</div>
                    <div class="product-available">Available: 500kg</div>
                      <img src="./pngs/steel.png" alt="battery" style="width: 200px; height: 200px; border-radius: 4px">
                    </div>

                    <div class="product-container" data-name="Unused Cardboard" data-price="₱34.12 per kg" data-available="Available: 350kg" data-img="./pngs/unusedcardboard.png">
                      <div class="product_name">Unused Cardboard</div>"
                      <div class="product-price">₱34.12 per kg</div>
                      <div class="product-available">Available: 350kg</div>
                        <img src="./pngs/unusedcardboard.png" alt="battery" style="width: 200px; height: 200px; border-radius: 4px">
                      </div>

                      <div class="product-container" data-name="Bicycle Parts" data-price="₱100.75 per unit" data-available="Available: 100 Pieces" data-img="./pngs/bicycle.png">
                        <div class="product_name">Bicycle Parts</div>
                        <div class="product-price">₱100.75 per unit</div>
                        <div class="product-available">Available: 100 Pieces</div>
                          <img src="./pngs/bicycle.png" alt="battery" style="width: 200px; height: 200px; border-radius: 4px">
                        </div>

                        <div class="product-container" data-name="Computer Parts" data-price="₱123.90 per kg" data-available="Available: 500kg" data-img="./pngs/computerparts.png">
                          <div class="product_name">Computer Parts</div>
                          <div class="product-price">₱123.90 per kg</div>
                          <div class="product-available">Available: 500kg</div>
                            <img src="./pngs/computerparts.png" alt="battery" style="width: 200px; height: 200px; border-radius: 4px">
                          </div>

                          <div class="product-container" data-name="Cans" data-price="₱25 per kg" data-available="Available: 430kg" data-img="./pngs/cans.png">
                            <div class="product_name">Cans</div>
                            <div class="product-price">₱25 per kg</div>
                            <div class="product-available">Available: 430kg</div>
                              <img src="./pngs/cans.png" alt="battery" style="width: 200px; height: 200px; border-radius: 4px">
                            </div>
                </div> 
  
 <div class="overlay" id="overlay">
  <div class="popup">
    
  <div class="popup-left">
    <img id="popup-img" src="" alt="product image">
    <h2 id="popup-name"></h2>
    <p id="popup-price"></p>
    <p id="popup-available"></p>
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













 </div>



  
 <script src="junkhub.js"></script>
</body>
</html>