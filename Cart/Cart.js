document.addEventListener('DOMContentLoaded', function () {
  const cartItems = Array.from(document.querySelectorAll('.cart-item'));


  function updateCartSummary() {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
      const qty = parseInt(item.querySelector('.item-qty').value);
      const price = parseFloat(item.dataset.price);
      totalItems += qty;
      totalPrice += qty * price;
    });

    document.getElementById('subtotal-items').textContent = `${totalItems} items`;
    document.getElementById('subtotal-price').textContent = `$${totalPrice.toFixed(2)}`;

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = totalItems === 0;
  }

  
  cartItems.forEach(item => {
    const qtySelect = item.querySelector('.item-qty');
    qtySelect.addEventListener('change', () => {
      updateCartSummary();
    });

    const removeBtn = item.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      item.remove();
      updateCartSummary();
    });
  });

  
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    
    window.location.href = '/login?redirect=shipping';
  });

  
  updateCartSummary();
});
