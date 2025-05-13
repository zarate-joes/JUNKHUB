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