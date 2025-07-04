document.addEventListener('DOMContentLoaded', function() {
  // Payment method toggle
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
  const gcashDetails = document.getElementById('gcash-details');
  const codNotice = document.getElementById('cod-notice');

  paymentMethods.forEach(method => {
    method.addEventListener('change', function() {
      if (this.value === 'gcash') {
        gcashDetails.style.display = 'block';
        codNotice.style.display = 'none';
      } else {
        gcashDetails.style.display = 'none';
        codNotice.style.display = 'block';
      }
    });
  });

  // Initialize display
  document.querySelector('input[name="payment-method"][value="cod"]').checked = true;
  gcashDetails.style.display = 'none';
  codNotice.style.display = 'block';

  // Form submission
document.querySelector('.place-order-btn').addEventListener('click', function(e) {
  e.preventDefault();
  // Only validate payment form now
  const paymentFormValid = validateForm('payment-form');
  
  if (paymentFormValid) {
    // Show loading state
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
    this.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
      alert('Order placed successfully!');
      // In a real app, you would redirect to order confirmation page
    }, 2000);
  }
});

  // Simple form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  let isValid = true;
  
  // For payment form only
  if (formId === 'payment-form') {
    // Additional validation for GCash
    if (document.querySelector('input[name="payment-method"]:checked').value === 'gcash') {
      const gcashNumber = document.getElementById('gcash-number');
      if (!gcashNumber.value.trim() || !/^09\d{9}$/.test(gcashNumber.value.trim())) {
        gcashNumber.style.borderColor = 'red';
        isValid = false;
      } else {
        gcashNumber.style.borderColor = '#ddd';
      }
    }
  }
  
  return isValid;
}
});