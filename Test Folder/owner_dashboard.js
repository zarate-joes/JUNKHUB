document.addEventListener('DOMContentLoaded', function() {
  // Tab Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all nav items and tab contents
      navItems.forEach(navItem => navItem.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked nav item
      this.classList.add('active');
      
      // Show corresponding tab content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Settings Tabs
  const settingsTabs = document.querySelectorAll('.settings-tabs .tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  settingsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      settingsTabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(`${tabId}-settings`).classList.add('active');
    });
  });
  
  // Messages Tabs
  const messagesTabs = document.querySelectorAll('.messages-tabs .tab-btn');
  
  messagesTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      messagesTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      // Here you would typically load different message types via AJAX
    });
  });
  
  // Toggle Switches
  const toggleSwitches = document.querySelectorAll('.toggle-switch input');
  toggleSwitches.forEach(sw => {
    sw.addEventListener('change', function() {
      const statusText = this.closest('.toggle-switch').nextElementSibling;
      if (this.checked) {
        statusText.textContent = 'Available';
      } else {
        statusText.textContent = 'Unavailable';
      }
    });
  });
  
  // Modal Handling
  const modals = document.querySelectorAll('.modal');
  const openModalButtons = document.querySelectorAll('[data-modal]');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  
  openModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).classList.add('active');
    });
  });
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
  
  // Password Strength Checker
  const passwordInput = document.getElementById('new-password');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strengthBars = document.querySelectorAll('.strength-bar');
      const strengthText = document.querySelector('.strength-text');
      const password = this.value;
      
      // Reset
      strengthBars.forEach(bar => bar.style.backgroundColor = '#ddd');
      strengthText.textContent = '';
      
      if (password.length === 0) return;
      
      // Very simple strength checker
      if (password.length < 6) {
        strengthBars[0].style.backgroundColor = '#dc3545';
        strengthText.textContent = 'Weak';
      } else if (password.length < 10) {
        strengthBars[0].style.backgroundColor = '#ffc107';
        strengthBars[1].style.backgroundColor = '#ffc107';
        strengthText.textContent = 'Medium';
      } else {
        strengthBars[0].style.backgroundColor = '#28a745';
        strengthBars[1].style.backgroundColor = '#28a745';
        strengthBars[2].style.backgroundColor = '#28a745';
        strengthText.textContent = 'Strong';
      }
    });
  }
  
  // Charts
  if (document.getElementById('overviewChart')) {
    const overviewCtx = document.getElementById('overviewChart').getContext('2d');
    const overviewChart = new Chart(overviewCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Sales (₱)',
          data: [1200, 1900, 1500, 2000, 1800, 2200, 2400],
          backgroundColor: 'rgba(255, 215, 0, 0.2)',  // gold
          borderColor: 'rgba(255, 215, 0, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Update your salesChart initialization
    if (document.getElementById('salesChart')) {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'bar',
        data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Sales (₱)',
            data: [3500, 4200, 3800, 4500],
            backgroundColor: 'rgba(255, 215, 0, 0.2)',  // gol
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 1
        }]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false, // This is crucial
        plugins: {
            legend: {
            display: false
            }
        },
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
    }
  
  if (document.getElementById('productsChart')) {
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    const productsChart = new Chart(productsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Plastic', 'Metal', 'Paper', 'Glass', 'Others'],
        datasets: [{
          data: [45, 30, 15, 5, 5],
          backgroundColor: [
            'rgba(255, 215, 0, 0.7)',
            'rgba(62, 167, 106, 0.7)',     // secondary
            'rgba(255, 224, 102, 0.7)',   // accent
            'rgba(255, 82, 82, 0.7)',     // danger
            'rgba(113, 113, 113, 0.7)'    // text-light
            ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }
  
  // Form Submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically handle form submission via AJAX
      alert('Form submitted! In a real application, this would save your data.');
      
      // Close modal if this is a modal form
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
  
  // Logout
  const logoutBtn = document.querySelector('.logout-container');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to logout?')) {
        // Here you would typically redirect to logout URL
        window.location.href = 'login.html';
      }
    });
  }
});