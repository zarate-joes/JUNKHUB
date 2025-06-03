document.addEventListener('DOMContentLoaded', function() {
  // Set the first section as active by default
  showSection('manage-account');
  
  // Add active class to the first sidebar item
  document.querySelector('.sidebar div:first-child').classList.add('active');
  
  // Initialize cart badge if there are items
  updateCartBadge();
  
  // Initialize all interactive elements
  initInteractiveElements();
});

function showSection(sectionId) {
  // Hide all content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active-section');
  });
  
  // Remove active class from all sidebar items
  document.querySelectorAll('.sidebar div').forEach(item => {
    item.classList.remove('active');
  });
  
  // Show the selected section
  document.getElementById(sectionId).classList.add('active-section');
  
  // Add active class to the clicked sidebar item
  const clickedItem = document.querySelector(`.sidebar div[onclick="showSection('${sectionId}')"]`);
  if (clickedItem) {
    clickedItem.classList.add('active');
  }
  
  // Scroll to top of the main display
  document.querySelector('.main-display').scrollTop = 0;
}

function initInteractiveElements() {
  // Order filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterOrders(this.textContent.trim());
    });
  });

  // Change profile picture
  document.querySelector('.change-pic-btn').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          document.querySelector('.profile-pic').src = event.target.result;
          document.querySelector('.profile-icon img').src = event.target.result;
          showToast('Profile picture updated successfully!');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });

  // Edit account details
  document.querySelector('.edit-btn').addEventListener('click', function() {
    const isEditing = this.classList.toggle('editing');
    
    if (isEditing) {
      this.innerHTML = '<i class="fas fa-save"></i> Save';
      enableAccountEditing();
    } else {
      this.innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
      saveAccountDetails();
    }
  });

  // Change password button
  document.querySelector('.change-password-btn').addEventListener('click', function() {
    showPasswordChangeModal();
  });

  // Two-factor authentication toggle
  document.querySelector('.switch input').addEventListener('change', function() {
    showToast(`Two-factor authentication ${this.checked ? 'enabled' : 'disabled'}`);
  });

  // Order action buttons
  document.querySelectorAll('.track-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast('Tracking information will be displayed here'));
  });

  document.querySelectorAll('.cancel-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const orderCard = this.closest('.order-card');
      if (confirm('Are you sure you want to cancel this order?')) {
        orderCard.querySelector('.order-status').textContent = 'Cancelled';
        orderCard.querySelector('.order-status').className = 'order-status cancelled';
        showToast('Order cancelled successfully');
      }
    });
  });

  document.querySelectorAll('.reorder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Items added to cart for reorder');
      updateCartBadge(1);
    });
  });

  document.querySelectorAll('.review-btn').forEach(btn => {
    btn.addEventListener('click', () => showReviewModal());
  });

  // Wishlist buttons
  document.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const wishlistItem = this.closest('.wishlist-item');
      wishlistItem.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        wishlistItem.remove();
        updateWishlistCount();
        showToast('Item removed from wishlist');
      }, 300);
    });
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      showToast('Item added to cart');
      updateCartBadge(1);
    });
  });

  document.querySelectorAll('.notify-me-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      showToast('You will be notified when this item is back in stock');
    });
  });

  document.querySelectorAll('.add-to-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.className = 'fas fa-heart';
        this.style.color = '#FF0000';
        showToast('Item added to wishlist');
        updateWishlistCount(1);
      } else {
        icon.className = 'far fa-heart';
        this.style.color = '#666';
        showToast('Item removed from wishlist');
        updateWishlistCount(-1);
      }
    });
  });

  // Sign out modal
  document.getElementById('cancelSignout').addEventListener('click', () => {
    document.getElementById('signoutModal').classList.remove('active');
  });
  
  document.getElementById('confirmSignout').addEventListener('click', () => {
    document.getElementById('signoutModal').classList.remove('active');
    showToast('Signed out successfully');
    setTimeout(() => {
      window.location.href = "../Landing Page/index.php";
    }, 1500);
  });

  // Close modal when clicking outside
  document.getElementById('signoutModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });
}

function enableAccountEditing() {
  const detailItems = document.querySelectorAll('.detail-item p');
  detailItems.forEach(item => {
    const originalText = item.textContent;
    const inputType = item.closest('.detail-item').querySelector('label').textContent === 'Email' ? 'email' : 'text';
    
    if (item.innerHTML.includes('<br>')) {
      // Handle address fields with line breaks
      const lines = originalText.split('<br>');
      item.innerHTML = '';
      lines.forEach((line, index) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = line.trim();
        input.className = 'edit-input';
        item.appendChild(input);
        if (index < lines.length - 1) {
          item.appendChild(document.createElement('br'));
        }
      });
    } else {
      // Regular text fields
      const input = document.createElement('input');
      input.type = inputType;
      input.value = originalText;
      input.className = 'edit-input';
      item.textContent = '';
      item.appendChild(input);
    }
  });
}

function saveAccountDetails() {
  const detailItems = document.querySelectorAll('.detail-item p');
  detailItems.forEach(item => {
    if (item.querySelector('.edit-input')) {
      // Handle address fields with multiple inputs
      if (item.querySelectorAll('.edit-input').length > 1) {
        const inputs = item.querySelectorAll('.edit-input');
        let newValue = '';
        inputs.forEach((input, index) => {
          newValue += input.value;
          if (index < inputs.length - 1) {
            newValue += '<br>';
          }
        });
        item.innerHTML = newValue;
      } else {
        // Regular text fields
        const input = item.querySelector('.edit-input');
        item.textContent = input.value;
      }
    }
  });
  showToast('Account details saved successfully');
}

function filterOrders(filter) {
  const orders = document.querySelectorAll('.order-card');
  orders.forEach(order => {
    const status = order.querySelector('.order-status').textContent.toLowerCase();
    
    if (filter === 'All Orders' || 
        (filter === 'Pending' && status === 'pending') ||
        (filter === 'Completed' && status === 'completed') ||
        (filter === 'Cancelled' && status === 'cancelled')) {
      order.style.display = 'block';
    } else {
      order.style.display = 'none';
    }
  });
}

function updateCartBadge(count = null) {
  const badge = document.querySelector('.cart-icon-badge');
  if (count !== null) {
    // Add to existing count if count is provided
    const current = parseInt(badge.textContent) || 0;
    badge.textContent = current + count;
  }
  
  // Show badge if there are items
  if (parseInt(badge.textContent) > 0) {
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function updateWishlistCount(change = 0) {
  const countElement = document.querySelector('.wishlist-count');
  if (!countElement) return;
  
  const currentText = countElement.textContent;
  const currentCount = parseInt(currentText) || 0;
  const newCount = Math.max(0, currentCount + change);
  
  countElement.textContent = `${newCount} item${newCount !== 1 ? 's' : ''}`;
}

function showPasswordChangeModal() {
  const modalHTML = `
    <div class="modal-overlay active" id="passwordModal">
      <div class="modal-container">
        <h3 class="modal-title">Change Password</h3>
        <form id="passwordForm">
          <div style="margin-bottom: 15px; text-align: left;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px;">Current Password</label>
            <input type="password" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
          </div>
          <div style="margin-bottom: 15px; text-align: left;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px;">New Password</label>
            <input type="password" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
          </div>
          <div style="margin-bottom: 20px; text-align: left;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px;">Confirm New Password</label>
            <input type="password" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
          </div>
          <div class="modal-buttons">
            <button type="button" class="modal-btn modal-btn-cancel" id="cancelPassword">Cancel</button>
            <button type="submit" class="modal-btn modal-btn-confirm">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('passwordModal').remove();
    showToast('Password changed successfully');
  });
  
  document.getElementById('cancelPassword').addEventListener('click', function() {
    document.getElementById('passwordModal').remove();
  });
  
  document.getElementById('passwordModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.remove();
    }
  });
}

function showReviewModal() {
  const modalHTML = `
    <div class="modal-overlay active" id="reviewModal">
      <div class="modal-container" style="max-width: 500px;">
        <h3 class="modal-title">Leave a Review</h3>
        <form id="reviewForm">
          <div style="margin-bottom: 15px; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 10px;">
              <i class="far fa-star" data-rating="1" style="cursor: pointer; margin: 0 2px;"></i>
              <i class="far fa-star" data-rating="2" style="cursor: pointer; margin: 0 2px;"></i>
              <i class="far fa-star" data-rating="3" style="cursor: pointer; margin: 0 2px;"></i>
              <i class="far fa-star" data-rating="4" style="cursor: pointer; margin: 0 2px;"></i>
              <i class="far fa-star" data-rating="5" style="cursor: pointer; margin: 0 2px;"></i>
            </div>
            <input type="hidden" id="ratingValue" name="rating" value="0">
          </div>
          <div style="margin-bottom: 15px; text-align: left;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px;">Review Title</label>
            <input type="text" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
          </div>
          <div style="margin-bottom: 20px; text-align: left;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px;">Your Review</label>
            <textarea style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 100px;" required></textarea>
          </div>
          <div class="modal-buttons">
            <button type="button" class="modal-btn modal-btn-cancel" id="cancelReview">Cancel</button>
            <button type="submit" class="modal-btn modal-btn-confirm">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Add star rating functionality
  const stars = document.querySelectorAll('#reviewModal .fa-star');
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      document.getElementById('ratingValue').value = rating;
      
      stars.forEach((s, index) => {
        if (index < rating) {
          s.className = 'fas fa-star';
        } else {
          s.className = 'far fa-star';
        }
      });
    });
    
    star.addEventListener('mouseover', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      stars.forEach((s, index) => {
        if (index < rating) {
          s.className = 'fas fa-star';
        }
      });
    });
    
    star.addEventListener('mouseout', function() {
      const currentRating = parseInt(document.getElementById('ratingValue').value);
      stars.forEach((s, index) => {
        if (index >= currentRating) {
          s.className = 'far fa-star';
        }
      });
    });
  });
  
  document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('reviewModal').remove();
    showToast('Thank you for your review!');
  });
  
  document.getElementById('cancelReview').addEventListener('click', function() {
    document.getElementById('reviewModal').remove();
  });
  
  document.getElementById('reviewModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.remove();
    }
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Add this CSS for toast messages
const toastCSS = document.createElement('style');
toastCSS.textContent = `
  .toast-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .toast-message.show {
    opacity: 1;
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
  }
`;
document.head.appendChild(toastCSS);


function signOut() {
  const modal = document.getElementById('signoutModal');
  modal.classList.add('active');
  
  // These event listeners are already in initInteractiveElements()
  // so we don't need to duplicate them here
}