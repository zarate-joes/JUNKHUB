document.addEventListener('DOMContentLoaded', function () {

const popupShopName = document.getElementById('popup-shop-name');

document.querySelectorAll('.product-container').forEach(container => {
    container.addEventListener('click', () => {

        popupShopName.textContent = container.dataset.shop;

        overlay.style.display = 'flex';
    });
  });

});
