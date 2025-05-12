function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartBadge = document.querySelector('.cart-icon-badge');
  
  if (cartBadge) {
    cartBadge.textContent = cartItems.length;
    cartBadge.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const cartItemsContainer = document.querySelector('.cart-items-container');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Update cart count in header
  const cartBadge = document.querySelector('.Cart-icon .badge');
  if (cartBadge) {
    cartBadge.textContent = cartItems.length;
    cartBadge.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
  }
  
  // Display cart items
  if (cartItemsContainer) {
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p style="margin: 20px;">Your cart is empty</p>';
      return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.style.display = 'flex';
      cartItemElement.style.padding = '15px';
      cartItemElement.style.borderBottom = '1px solid #eee';
      cartItemElement.style.alignItems = 'center';
      
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
        <div style="flex-grow: 1;">
          <h3 style="margin: 0; font-size: 16px;">${item.name}</h3>
          <p style="margin: 5px 0; color: #666;">${item.price}</p>
        </div>
        <button class="remove-item" data-index="${index}" style="background: none; border: none; cursor: pointer; color: #ff4444;">
          <i class="fas fa-trash"></i>
        </button>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removeItemFromCart(index);
      });
    });
  }
  
  // Update summary information
  updateSummary();
});

function removeItemFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartBadge(); // Update badge immediately
  location.reload(); // Refresh to update the cart display
}

// Call updateCartBadge when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  
  const cartItemsContainer = document.querySelector('.cart-items-container');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Display cart items
  if (cartItemsContainer) {
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p style="margin: 20px;">Your cart is empty</p>';
      return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.style.display = 'flex';
      cartItemElement.style.padding = '15px';
      cartItemElement.style.borderBottom = '1px solid #eee';
      cartItemElement.style.alignItems = 'center';
      
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
        <div style="flex-grow: 1;">
          <h3 style="margin: 0; font-size: 16px;">${item.name}</h3>
          <p style="margin: 5px 0; color: #666;">${item.price}</p>
        </div>
        <button class="remove-item" data-index="${index}" style="background: none; border: none; cursor: pointer; color: #ff4444;">
          <i class="fas fa-trash"></i>
        </button>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removeItemFromCart(index);
      });
    });
  }
  
  // Update summary information
  updateSummary();
});

function updateSummary() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const subtotalElement = document.querySelector('.summary-item:first-child span:last-child');
  const balanceElement = document.querySelector('.summary-total strong:last-child');
  
  if (subtotalElement && balanceElement) {
    // Calculate subtotal (this is a simplified version - you'll need proper price parsing)
    const subtotal = cartItems.length * 10.00; // Replace with actual price calculation
    subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
    balanceElement.textContent = `₱${(subtotal + 4.00 - 2.00).toFixed(2)}`; // Shipping and discount
  }
}