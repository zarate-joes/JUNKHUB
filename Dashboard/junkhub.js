document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('.Cart-icon, .notification-icon, .shop-cat, .products-cat, .search-container');

  icons.forEach(icon => {
    icon.addEventListener('click', function () {
      if (this.classList.contains('clicked')) {
        this.classList.remove('clicked');
      } else {
        icons.forEach(i => i.classList.remove('clicked'));
        this.classList.add('clicked');
      
      }
    });
  });





  // Shop data - in a real app, this would come from an API
  const shops = [
    {
      id: 1,
      name: "Green Recycle Shop",
      image: "./pngs/shop-1.jfif", 
      rating: "★★★★☆",
      location: "Manila",
      items: [
        {
          name: "Aluminum Metal",
          price: "₱150.09 per kg",
          available: "Available: 500kg",
          shop: "ⓘ Green Recycle Shop",
          img: "./pngs/aluminum.png"
        },
        {
          name: "Plastic Bottles",
          price: "₱26.01 per kg",
          available: "Available: 1,000kg",
          shop: "ⓘ Green Recycle Shop",
          img: "./pngs/plastic.png"
        }
      ]
    },
    {
      id: 2,
      name: "Eco-Friendly Junk",
      image: "./pngs/shop-2.jpg",
      rating: "★★★☆☆",
      location: "Quezon City",
      items: [
        {
          name: "Old Car Batteries",
          price: "₱500 per unit",
          available: "Available: 25units",
          shop: "ⓘ Eco-Friendly Junk",
          img: "./pngs/battery.png"
        },
        {
          name: "Copper",
          price: "₱123.90 per kg",
          available: "Available: 500kg",
          shop: "ⓘ Eco-Friendly Junk",
          img: "./pngs/copper.png"
        }
      ]
    },
    {
      id: 3,
      name: "Metro Scrap Dealer",
      image: "./pngs/Shop-3.jpg",
      rating: "★★★★★",
      location: "Makati",
      items: [
        {
          name: "Scrap Metal - Steel",
          price: "₱150.09 per kg",
          available: "Available: 500kg",
          shop: "ⓘ Metro Scrap Dealer",
          img: "./pngs/steel.png"
        },
        {
          name: "Computer Parts",
          price: "₱123.90 per kg",
          available: "Available: 500kg",
          shop: "ⓘ Metro Scrap Dealer",
          img: "./pngs/computerparts.png"
        }
      ]
    },
    // Add more shops as needed
  ];



  // Render shops
  function renderShops() {
    const shopsWrapper = document.querySelector('.shops-wrapper');
    shopsWrapper.innerHTML = '';
    
    shops.forEach(shop => {
      const shopElement = document.createElement('div');
      shopElement.className = 'shop-container';
      shopElement.dataset.shopId = shop.id;
      
      shopElement.innerHTML = `
        <img src="${shop.image}" alt="${shop.name}" class="shop-avatar">
        <div class="shop-name">${shop.name}</div>
        <div class="shop-rating">${shop.rating}</div>
        <div class="shop-location">${shop.location}</div>
      `;
      
      shopsWrapper.appendChild(shopElement);
      
      // Add click event to show shop items
      shopElement.addEventListener('click', () => showShopItems(shop.id));
    });
  }


// Show items for a specific shop
function showShopItems(shopId) {

  document.querySelectorAll('.shop-container').forEach(shop => {
    shop.classList.remove('active');
  });

  const shop = shops.find(s => s.id == shopId);
  if (!shop) return;
  
  const shopItemsContainer = document.getElementById('shop-items-container');
  const shopItemsSection = document.getElementById('shop-items-section');
  
  if (shopItemsSection.style.display === 'block' && 
      shopItemsSection.dataset.currentShop === shopId.toString()) {
    shopItemsSection.style.display = 'none';
    shopItemsSection.classList.remove('visible');
    shopItemsSection.dataset.currentShop = '';
    return;
  }
  
  // Otherwise, show the shop's items
  shopItemsContainer.innerHTML = '';
  
  shop.items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'product-container';
    itemElement.dataset.name = item.name;
    itemElement.dataset.price = item.price;
    itemElement.dataset.available = item.available;
    itemElement.dataset.shop = item.shop;
    itemElement.dataset.img = item.img;
    
    itemElement.innerHTML = `
      <div class="product_name">${item.name}</div>
      <div class="product-price">${item.price}</div>
      <div class="product-available">${item.available}</div>
      <div class="shop-name">${item.shop}</div>
      <img src="${item.img}" alt="${item.name}" style="width: 200px; height: 200px; border-radius: 5px">
    `;
    
    shopItemsContainer.appendChild(itemElement);
  });
  
  // Add active class to the clicked shop container
  const clickedShop = document.querySelector(`.shop-container[data-shop-id="${shopId}"]`);
  if (clickedShop) {
    clickedShop.classList.add('active');
  }
  
  shopItemsSection.style.display = 'block';
  shopItemsSection.classList.add('visible');
  shopItemsSection.dataset.currentShop = shopId;
  
  attachProductClickHandlers();
  
  shopItemsSection.scrollIntoView({ behavior: 'smooth' });
}

function attachProductClickHandlers() {
  document.querySelectorAll('.product-container, .product-container0').forEach(container => {
    container.addEventListener('click', (e) => {
      
      if (e.target.tagName === 'A') return;
      
      popupImg.src = container.dataset.img;
      popupName.textContent = container.dataset.name;
      popupPrice.textContent = container.dataset.price;
      popupAvailable.textContent = container.dataset.available;
      popupShopName.textContent = container.dataset.shop;

      overlay.style.display = 'flex';
    });
  });
}

attachProductClickHandlers();

  renderShops();
  
// =========================================================================================


// Get the category buttons
const shopCat = document.querySelector('.shop-cat');
const productsCat = document.querySelector('.products-cat');
const homeCat = document.querySelector('.home-cat');

// Get all sections
const shopSection = document.querySelector('.shop-section');
const productSections = document.querySelectorAll('.product-section');
const mainbg = document.querySelector('.mainbg');

// Function to show only shops
function showShops() {
  shopSection.style.display = 'block';
  productSections.forEach(section => {
    section.style.display = 'none';
  });
  // Reset to default view (centered)
  mainbg.style.margin = '55px auto 0 auto';
}

// Function to show only products
function showProducts() {
  shopSection.style.display = 'none';
  productSections.forEach(section => {
    section.style.display = 'block';
  });
  // Reset to default view (centered)
  mainbg.style.margin = '55px auto 0 auto';
}

// Function to show both (home view)
function showHome() {
  shopSection.style.display = 'block';
  productSections.forEach(section => {
    section.style.display = 'block';
  });
}

// Add event listeners to category buttons
if (shopCat) {
  shopCat.addEventListener('click', function(e) {
    e.preventDefault();
    showShops();
    // Update clicked state
    document.querySelectorAll('.shop-cat, .products-cat, .home-cat').forEach(el => el.classList.remove('clicked'));
    this.classList.add('clicked');
  });
}

if (productsCat) {
  productsCat.addEventListener('click', function(e) {
    e.preventDefault();
    showProducts();
    // Update clicked state
    document.querySelectorAll('.shop-cat, .products-cat, .home-cat').forEach(el => el.classList.remove('clicked'));
    this.classList.add('clicked');
  });
}

if (homeCat) {
  homeCat.addEventListener('click', function(e) {
    e.preventDefault();
    showHome();
    // Update clicked state
    document.querySelectorAll('.shop-cat, .products-cat, .home-cat').forEach(el => el.classList.remove('clicked'));
    this.classList.add('clicked');
  });
}

// Initialize to show home view by default
showHome();





// =========================================================================================





  
// Notification Panel Functionality
const notificationIcon = document.querySelector('.notification-icon');
const notificationPanel = document.getElementById('notificationPanel');
const closeNotifications = document.getElementById('closeNotifications');

if (notificationIcon && notificationPanel) {
  notificationIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Toggle notification panel
    notificationPanel.classList.toggle('visible');
    
    // Remove badge when notifications are opened
    const badge = this.querySelector('.badge');
    if (badge) {
      badge.style.display = 'none';
    }
    
    // Close sidebar if open
    const sidebar = document.querySelector('.sidebar');
    const messengerPanel = document.getElementById('messengerPanel');
    const mainbg = document.querySelector('.mainbg');
    
    if (sidebar.classList.contains('visible')) {
      sidebar.classList.remove('visible');
    }
    
    // Adjust main content margin
    if (notificationPanel.classList.contains('visible')) {
      if (messengerPanel.classList.contains('visible')) {
        mainbg.style.margin = '55px 600px 0 0';
      } else {
        mainbg.style.margin = '55px 300px 0 0';
      }
    } else {
      if (messengerPanel.classList.contains('visible')) {
        mainbg.style.margin = '55px 300px 0 0';
      } else {
        mainbg.style.margin = '55px auto 0 auto';
      }
    }
  });
  
  closeNotifications.addEventListener('click', function(e) {
    e.stopPropagation();
    notificationPanel.classList.remove('visible');
  });
}

// Close notifications when clicking outside
document.addEventListener('click', function(e) {
  if (notificationPanel && !notificationPanel.contains(e.target) && e.target !== notificationIcon) {
    notificationPanel.classList.remove('visible');
  }
});



// Add this to your existing notification panel functionality
const notificationFilters = document.querySelectorAll('.notification-filter');
if (notificationFilters.length) {
  notificationFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Remove active class from all filters
      notificationFilters.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked filter
      this.classList.add('active');
      
      const filterType = this.dataset.filter;
      const notificationItems = document.querySelectorAll('.notification-item');
      
      notificationItems.forEach(item => {
        if (filterType === 'all') {
          item.style.display = 'block';
        } else if (filterType === 'unread') {
          if (item.classList.contains('unread')) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
}


// =========================================================================================

// Messenger Panel Functionality
const messageIcon = document.querySelector('.message-icon');
const messengerPanel = document.getElementById('messengerPanel');
const closeMessenger = document.getElementById('closeMessenger');

if (messageIcon && messengerPanel) {
  messageIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Toggle messenger panel
    messengerPanel.classList.toggle('visible');
    
    // Remove badge when opened
    const badge = this.querySelector('.message-badge');
    if (badge) {
      badge.style.display = 'none';
    }
    
    // Close other panels if open
    const sidebar = document.querySelector('.sidebar');
    const notificationPanel = document.getElementById('notificationPanel');
    const mainbg = document.querySelector('.mainbg');
    
    if (sidebar.classList.contains('visible')) {
      sidebar.classList.remove('visible');
    }
    
    if (notificationPanel.classList.contains('visible')) {
      notificationPanel.classList.remove('visible');
    }
    
    // Adjust main content margin
    if (messengerPanel.classList.contains('visible')) {
      if (notificationPanel.classList.contains('visible')) {
        mainbg.style.margin = '55px 600px 0 0';
      } else {
        mainbg.style.margin = '55px 300px 0 0';
      }
    } else {
      if (notificationPanel.classList.contains('visible')) {
        mainbg.style.margin = '55px 300px 0 0';
      } else {
        mainbg.style.margin = '55px auto 0 auto';
      }
    }
  });
  
  closeMessenger.addEventListener('click', function(e) {
    e.stopPropagation();
    messengerPanel.classList.remove('visible');
    
    // Adjust main content margin
    const notificationPanel = document.getElementById('notificationPanel');
    const mainbg = document.querySelector('.mainbg');
    
    if (notificationPanel.classList.contains('visible')) {
      mainbg.style.margin = '55px 300px 0 0';
    } else {
      mainbg.style.margin = '55px auto 0 auto';
    }
  });
}

// Close messenger when clicking outside
document.addEventListener('click', function(e) {
  if (messengerPanel && !messengerPanel.contains(e.target) && e.target !== messageIcon) {
    messengerPanel.classList.remove('visible');
    
    // Adjust main content margin
    const notificationPanel = document.getElementById('notificationPanel');
    const mainbg = document.querySelector('.mainbg');
    
    if (notificationPanel.classList.contains('visible')) {
      mainbg.style.margin = '55px 300px 0 0';
    } else {
      mainbg.style.margin = '55px auto 0 auto';
    }
  }
});

// Messenger filters functionality
const messengerFilters = document.querySelectorAll('.messenger-filter');
if (messengerFilters.length) {
  messengerFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Remove active class from all filters
      messengerFilters.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked filter
      this.classList.add('active');
      
      const filterType = this.dataset.filter;
      const messengerItems = document.querySelectorAll('.messenger-item');
      
      messengerItems.forEach(item => {
        if (filterType === 'all') {
          item.style.display = 'flex';
        } else if (filterType === 'unread') {
          if (item.classList.contains('unread')) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
}

// =========================================================================================


document.querySelector('.sidebar-toggle').addEventListener('click', function(e) {
  e.stopPropagation();

  const sidebar = document.querySelector('.sidebar');

  const mainbg = document.querySelector('.mainbg');

  sidebar.classList.remove('visible');
  mainbg.style.margin = '55px auto 0 auto'; // center again

});

document.querySelector('.logo').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  const sidebar = document.querySelector('.sidebar');
  const mainbg = document.querySelector('.mainbg');


  sidebar.classList.toggle('visible');

  if (sidebar.classList.contains('visible')) {
    mainbg.style.margin = '55px 0 0 225px'; // shift right

  } else {
    mainbg.style.margin = '55px auto 0 auto'; // center again

  }
});

  // Popup functionality

const overlay = document.getElementById('overlay');
const popupImg = document.getElementById('popup-img');
const popupName = document.getElementById('popup-name');
const popupPrice = document.getElementById('popup-price');
const popupAvailable = document.getElementById('popup-available');
const popupShopName = document.getElementById('popup-shop-name');

// Updated selector to include both `.product-container` and `.product-container0`
document.querySelectorAll('.product-container, .product-container0').forEach(container => {
  container.addEventListener('click', () => {
    popupImg.src = container.dataset.img;
    popupName.textContent = container.dataset.name;
    popupPrice.textContent = container.dataset.price;
    popupAvailable.textContent = container.dataset.available;
    popupShopName.textContent = container.dataset.shop;

    overlay.style.display = 'flex';
  });
});


  function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartBadge = document.querySelector('.cart-icon-badge');
  
  if (cartBadge) {
    cartBadge.textContent = cartItems.length;
    cartBadge.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
  }
}

document.querySelector('.add-to-cart').addEventListener('click', function() {
  const popupName = document.getElementById('popup-name').textContent;
  const popupPrice = document.getElementById('popup-price').textContent;
  const popupImg = document.getElementById('popup-img').src;
  
  // Get existing cart items from localStorage or initialize empty array
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Add new item to cart
  cartItems.push({
    name: popupName,
    price: popupPrice,
    image: popupImg
  });
  
  // Save back to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  // Update the badge immediately
  updateCartBadge();
  
  // Show the flying icon animation
  const icon = this.querySelector('i');
  const cartIcon = document.querySelector('.Cart-icon');
  const cartBadge = document.querySelector('.cart-icon-badge');

  const iconRect = icon.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const flyIcon = icon.cloneNode(true);
  flyIcon.classList.add('flying-icon');
  document.body.appendChild(flyIcon);
  overlay.style.display = 'none';

  flyIcon.style.left = iconRect.left + 'px';
  flyIcon.style.top = iconRect.top + 'px';

  const deltaX = cartRect.left - iconRect.left;
  const deltaY = cartRect.top - iconRect.top;

  flyIcon.style.setProperty('--x', `${deltaX}px`);
  flyIcon.style.setProperty('--y', `${deltaY}px`);

  requestAnimationFrame(() => {
    flyIcon.style.animation = 'fly-to-cart 1s ease-in-out forwards';
  });

  flyIcon.addEventListener('animationend', () => {
    flyIcon.remove();
  });
});

  // Back button functionality

  const backButton = document.getElementById('back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
  }

  // Slides

  let currentIndex = 0;
  const slides = document.getElementById("slides");
  const totalSlides = slides.children.length;
  const dots = document.querySelectorAll('.dot');

  function updateIndicators(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function showSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators(currentIndex);
  }

  function showNextSlide() {
    showSlide(currentIndex + 1);
  }

  function showPrevSlide() {
    showSlide(currentIndex - 1);
  }

  let autoSlide = setInterval(showNextSlide, 3000);

  function resetInterval() {
    clearInterval(autoSlide);
    autoSlide = setInterval(showNextSlide, 3000);
  }

  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showNextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showPrevSlide();
      resetInterval();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });

  showSlide(currentIndex);






  


  
});
