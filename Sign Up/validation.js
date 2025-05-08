// Validation script for the signup form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    
    if (form) {
      // Add submission handler
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form fields
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const contactNumber = document.getElementById('contactNumber');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const terms = document.getElementById('terms');
        
        // Validate form fields
        let isValid = true;
        
        // First name validation
        if (!firstName.value.trim()) {
          showError(firstName, 'First name is required');
          isValid = false;
        } else {
          removeError(firstName);
        }
        
        // Last name validation
        if (!lastName.value.trim()) {
          showError(lastName, 'Last name is required');
          isValid = false;
        } else {
          removeError(lastName);
        }
        
        // Contact number validation
        if (!contactNumber.value.trim()) {
          showError(contactNumber, 'Contact number is required');
          isValid = false;
        } else if (!/^\d+$/.test(contactNumber.value.trim())) {
          showError(contactNumber, 'Contact number should contain only digits');
          isValid = false;
        } else {
          removeError(contactNumber);
        }
        
        // Email validation
        if (!email.value.trim()) {
          showError(email, 'Email is required');
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
          showError(email, 'Enter a valid email address');
          isValid = false;
        } else {
          removeError(email);
        }
        
        // Password validation
        if (!password.value) {
          showError(password, 'Password is required');
          isValid = false;
        } else if (password.value.length < 8) {
          showError(password, 'Password must be at least 8 characters long');
          isValid = false;
        } else {
          removeError(password);
        }
        
        // Terms checkbox validation
        if (!terms.checked) {
          showError(terms, 'You must agree to the terms and conditions');
          isValid = false;
        } else {
          removeError(terms);
        }
        
        // If form is valid, submit
        if (isValid) {
          // Here you would normally submit the form or call an API
          showSuccessMessage();
        }
      });
      
      // Add input event listeners for real-time validation
      const inputs = form.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          if (input.type === 'checkbox') {
            if (input.checked) {
              removeError(input);
            }
          } else {
            if (input.value.trim()) {
              removeError(input);
            }
          }
        });
      });
    }
    
    // Helper function to show error messages
    function showError(input, message) {
      const formGroup = input.closest('.form-group');
      let errorElement = formGroup.querySelector('.error-message');
      
      if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff3860';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        
        if (input.type === 'checkbox') {
          // For checkbox, append after the label
          formGroup.appendChild(errorElement);
        } else {
          // For text inputs, append after the input
          input.insertAdjacentElement('afterend', errorElement);
        }
      }
      
      input.style.borderColor = '#ff3860';
      errorElement.textContent = message;
    }
    
    // Helper function to remove error messages
    function removeError(input) {
      const formGroup = input.closest('.form-group');
      const errorElement = formGroup.querySelector('.error-message');
      
      if (errorElement) {
        errorElement.remove();
      }
      
      if (input.type !== 'checkbox') {
        input.style.borderColor = '';
      }
    }
    
    // Helper function to show success message
    function showSuccessMessage() {
      // Hide the form
      form.style.display = 'none';
      
      // Create and show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.style.textAlign = 'center';
      successMessage.style.padding = '2rem';
      
      const title = document.createElement('h2');
      title.textContent = 'Registration Successful!';
      title.style.color = '#09c372';
      title.style.marginBottom = '1rem';
      
      const message = document.createElement('p');
      message.textContent = 'Thank you for signing up with JunkHUB! You will receive a confirmation email shortly.';
      
      successMessage.appendChild(title);
      successMessage.appendChild(message);
      
      // Add the success message to the form panel
      const formPanel = document.querySelector('.form-panel');
      formPanel.appendChild(successMessage);
    }
  });