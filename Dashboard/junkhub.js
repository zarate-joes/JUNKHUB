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

  // Popup functionality

  const overlay = document.getElementById('overlay');
  const popupImg = document.getElementById('popup-img');
  const popupName = document.getElementById('popup-name');
  const popupPrice = document.getElementById('popup-price');
  const popupAvailable = document.getElementById('popup-available');
  const popupShopName = document.getElementById('popup-shop-name');

  document.querySelectorAll('.product-container').forEach(container => {
    container.addEventListener('click', () => {
      popupImg.src = container.dataset.img;
      popupName.textContent = container.dataset.name;
      popupPrice.textContent = container.dataset.price;
      popupAvailable.textContent = container.dataset.available;
      popupShopName.textContent = container.dataset.shop;

      overlay.style.display = 'flex';
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

// Add to cart animation

document.querySelector('.add-to-cart').addEventListener('click', function () {
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
    flyIcon.style.animation = 'fly-to-cart 1.5s ease-in-out forwards';
  });

  flyIcon.addEventListener('animationend', () => {
    flyIcon.remove();

    // Show and update badge
    let count = parseInt(cartBadge.textContent) || 0;
    count++;
    cartBadge.textContent = count;
    cartBadge.style.display = 'inline-block';
  });
});