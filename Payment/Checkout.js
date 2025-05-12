document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const checkoutForm = document.getElementById('checkout-form');
  const completeOrderBtn = document.getElementById('complete-order');
  const paymentMethods = document.querySelectorAll('input[name="payment"]');
  const creditCardFields = document.getElementById('credit-card-fields');
  const paypalNotice = document.getElementById('paypal-notice');
  const gcashRadio = document.getElementById('gcash');
  const codRadio = document.getElementById('cod');
  const gcashInputBox = document.getElementById('gcash-input-box');
  
  // Initialize
  paypalNotice.style.display = 'none';
  gcashInputBox.style.display = 'none'; // Initially hide GCash input box

  // Payment method toggle
  paymentMethods.forEach(method => {
    method.addEventListener('change', function() {
      if (this.id === 'credit-card') {
        creditCardFields.style.display = 'block';
        paypalNotice.style.display = 'none';
        gcashInputBox.style.display = 'none'; // Hide GCash input when Credit Card is selected
      } else if (this.id === 'paypal') {
        creditCardFields.style.display = 'none';
        paypalNotice.style.display = 'block';
        gcashInputBox.style.display = 'none'; // Hide GCash input when PayPal is selected
      } else if (this.id === 'gcash') {
        gcashInputBox.style.display = 'block'; // Show GCash input box
        creditCardFields.style.display = 'none'; // Hide Credit Card fields
        paypalNotice.style.display = 'none'; // Hide PayPal notice
      } else if (this.id === 'cod') {
        gcashInputBox.style.display = 'none'; // Hide GCash input box
        creditCardFields.style.display = 'none'; // Hide Credit Card fields
        paypalNotice.style.display = 'none'; // Hide PayPal notice
      }
    });
  });

  // Form validation
  checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
      // Show loading state
      completeOrderBtn.disabled = true;
      completeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      // Simulate payment processing
      processPayment()
        .then(orderDetails => {
          // On success
          showSuccessMessage(orderDetails);
          completeOrderBtn.innerHTML = 'Order Complete!';

          // In a real app, you would redirect to confirmation page
          // window.location.href = '/order-confirmation.html';
        })
        .catch(error => {
          // On error
          showErrorMessage(error);
          completeOrderBtn.disabled = false;
          completeOrderBtn.innerHTML = 'Complete Order';
        });
    }
  });

  // Form validation function
  function validateForm() {
    let isValid = true;
    const requiredFields = checkoutForm.querySelectorAll('[required]');

    // Validate required fields
    requiredFields.forEach(field => {
      field.classList.remove('border-red-500');

      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        isValid = false;

        // Create error message if it doesn't exist
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
          const errorMsg = document.createElement('p');
          errorMsg.className = 'error-message text-red-500 text-xs mt-1';
          errorMsg.textContent = 'This field is required';
          field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }
      } else {
        // Remove error message if exists
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
          field.nextElementSibling.remove();
        }
      }
    });

    // Additional credit card validation if selected
    if (document.getElementById('credit-card').checked) {
      const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
      const expiryDate = document.getElementById('expiry-date').value;
      const cvc = document.getElementById('cvc').value;

      if (!validateCardNumber(cardNumber)) {
        document.getElementById('card-number').classList.add('border-red-500');
        isValid = false;
      }

      if (!validateExpiryDate(expiryDate)) {
        document.getElementById('expiry-date').classList.add('border-red-500');
        isValid = false;
      }

      if (!validateCVC(cvc)) {
        document.getElementById('cvc').classList.add('border-red-500');
        isValid = false;
      }
    }

    return isValid;
  }

  // Card validation helpers
  function validateCardNumber(number) {
    // Simple Luhn algorithm check
    return /^\d{13,19}$/.test(number) && luhnCheck(number);
  }

  function validateExpiryDate(date) {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;

    const [month, year] = date.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return month >= 1 && month <= 12;
  }

  function validateCVC(cvc) {
    return /^\d{3,4}$/.test(cvc);
  }

  function luhnCheck(number) {
    let sum = 0;
    let alternate = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);

      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  }

  // Simulate payment processing
  function processPayment() {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // 80% chance of success for demo purposes
        if (Math.random() < 0.8) {
          resolve({
            orderId: 'ORD-' + Math.floor(Math.random() * 1000000),
            amount: document.querySelector('.order-total').textContent,
            date: new Date().toLocaleString()
          });
        } else {
          reject(new Error('Payment processing failed. Please try again or use a different payment method.'));
        }
      }, 2000);
    });
  }

  // Show success message
  function showSuccessMessage(orderDetails) {
    const successHTML = `
      <div class="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="fas fa-check-circle text-green-500"></i>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Order successful!</h3>
            <div class="mt-2 text-sm text-green-700">
              <p>Order ID: ${orderDetails.orderId}</p>
              <p>Amount: ${orderDetails.amount}</p>
              <p>Date: ${orderDetails.date}</p>
              <p class="mt-2">A confirmation has been sent to your email.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('messages-container').innerHTML = successHTML;
  }

  // Show error message
  function showErrorMessage(error) {
    const errorHTML = `
      <div class="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="fas fa-exclamation-circle text-red-500"></i>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Payment Error</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>${error.message}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('messages-container').innerHTML = errorHTML;
  }

  // Format card number input
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s+/g, '');
      if (value.length > 16) value = value.substr(0, 16);

      // Add space every 4 digits
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      e.target.value = value;
    });
  }

  // Format expiry date input
  const expiryDateInput = document.getElementById('expiry-date');
  if (expiryDateInput) {
    expiryDateInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 4) value = value.substr(0, 4);

      // Add slash after 2 digits
      if (value.length > 2) {
        value = value.replace(/^(\d{2})/, '$1/');
      }
      e.target.value = value;
    });
  }
});
