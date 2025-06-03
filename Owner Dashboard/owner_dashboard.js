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
      const activeTab = document.getElementById(tabId);
      activeTab.classList.add('active');
      
      // Load content dynamically based on tab
      loadTabContent(tabId);
    });
  });

  // Function to load tab content dynamically
  function loadTabContent(tabId) {
    switch(tabId) {
      case 'products':
        loadProducts();
        break;
      case 'orders':
        loadOrders();
        break;
      case 'messages':
        loadMessages();
        break;
      case 'analytics':
        loadAnalytics();
        break;
      case 'settings':
        loadSettings();
        break;
      default:
        // Overview tab loads by default
        break;
    }
  }

  // Add this to the existing owner_dashboard.js file

  // Initialize messages data in localStorage if not exists
  if (!localStorage.getItem('messages')) {
    const initialMessages = [
      {
        id: 'M001',
        subject: 'Price Inquiry',
        content: 'Hi! I\'m interested in your plastic bottles. What\'s the minimum quantity you sell?',
        from: 'John Doe',
        time: '2 hours ago',
        read: false,
        type: 'inquiry'
      },
      {
        id: 'M002',
        subject: 'Order Confirmation',
        content: 'Just wanted to confirm that my order has been processed. Thanks!',
        from: 'Sarah Smith',
        time: '1 day ago',
        read: true,
        type: 'order'
      },
      {
        id: 'M003',
        subject: 'Delivery Question',
        content: 'Do you offer delivery for large quantities of scrap metal?',
        from: 'Michael Johnson',
        time: '3 days ago',
        read: false,
        type: 'inquiry'
      }
    ];
    localStorage.setItem('messages', JSON.stringify(initialMessages));
  }

  // Load messages function
  // Update the loadMessages function to match the table arrangement
  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesContainer = document.getElementById('messages-container');
    const activeTab = document.querySelector('.messages-tabs .tab-btn.active')?.dataset.tab || 'inbox';
    
    if (!messagesContainer) return;
    
    // Clear existing messages
    messagesContainer.innerHTML = '';
    
    // Create table structure
    const messagesTable = document.createElement('div');
    messagesTable.className = 'messages-table';
    
    // Create table header
    const tableHeader = document.createElement('div');
    tableHeader.className = 'table-header';
    tableHeader.innerHTML = `
      <div>From</div>
      <div>Subject</div>
      <div>Preview</div>
      <div>Time</div>
      <div>Status</div>
      <div>Actions</div>
    `;
    messagesTable.appendChild(tableHeader);
    
    // Filter messages based on active tab
    let filteredMessages = messages;
    if (activeTab === 'unread') {
      filteredMessages = messages.filter(message => !message.read);
    }
    
    // Add messages to table
    filteredMessages.forEach(message => {
      const tableRow = document.createElement('div');
      tableRow.className = `table-row message-card ${!message.read ? 'unread' : ''}`;
      tableRow.dataset.id = message.id;
      
      tableRow.innerHTML = `
        <div class="message-sender">
          <div class="user-profile">
            <img src="../Dashboard/pngs/prof.png" alt="User" width="30">
            <span>${message.from}</span>
          </div>
        </div>
        <div class="message-subject">
          <h3>${message.subject}</h3>
        </div>
        <div class="message-preview">
          <p>${message.content}</p>
        </div>
        <div class="message-time">
          <span>${message.time}</span>
        </div>
        <div class="message-status">
          <span class="status-badge ${message.read ? 'read' : 'unread'}">
            ${message.read ? 'Read' : 'Unread'}
          </span>
        </div>
        <div class="message-actions">
          <button class="btn btn-reply">Reply</button>
          <button class="btn ${message.read ? 'btn-mark-unread' : 'btn-mark-read'}">
            ${message.read ? 'Mark Unread' : 'Mark Read'}
          </button>
          <button class="btn btn-delete">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      `;
      
      messagesTable.appendChild(tableRow);
      messagesContainer.appendChild(messagesTable);
      
      // Add event listeners for the new message row
      setupMessageCardEvents(tableRow, message);
    });
    
    // Update tab counts
    updateMessageCounts();
  }

  // Setup event listeners for message card
  function setupMessageCardEvents(card, message) {
    // Reply button
    const replyBtn = card.querySelector('.btn-reply');
    replyBtn.addEventListener('click', function() {
      const modal = document.getElementById('reply-modal');
      document.getElementById('reply-to').textContent = message.from;
      document.getElementById('reply-subject').textContent = `Re: ${message.subject}`;
      modal.classList.add('active');
    });
    
    // Mark as read/unread button
    const markBtn = card.querySelector('.btn-mark-read, .btn-mark-unread');
    markBtn.addEventListener('click', function() {
      const messages = JSON.parse(localStorage.getItem('messages'));
      const index = messages.findIndex(m => m.id === message.id);
      
      if (index !== -1) {
        messages[index].read = !messages[index].read;
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages(); // Refresh the messages list
        updateMessageCounts(); // Update the counts in tabs
      }
    });

    const deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function() {
      if (confirm(`Are you sure you want to delete this message from ${message.from}?`)) {
        const messages = JSON.parse(localStorage.getItem('messages'));
        const updatedMessages = messages.filter(m => m.id !== message.id);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        loadMessages(); // Refresh the messages list
        updateMessageCounts(); // Update the counts in tabs
        
        // Update notification badge count
        updateNotificationBadge();
      }
    });
  }

  // Messages tabs functionality
  function setupMessagesTabs() {
    const tabs = document.querySelectorAll('.messages-tabs .tab-btn');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Load messages for this tab
        loadMessages();
      });
    });
  }


  // Update the loadTabContent function to include messages setup
  function loadTabContent(tabId) {
    switch(tabId) {
      case 'products':
        loadProducts();
        break;
      case 'orders':
        loadOrders();
        break;
      case 'messages':
        loadMessages();
        setupMessagesTabs();
        setupMessagesSearch();
        break;
      case 'analytics':
        loadAnalytics();
        break;
      case 'settings':
        loadSettings();
        break;
      default:
        // Overview tab loads by default
        break;
    }
  }

  function updateNotificationBadge() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const unreadCount = messages.filter(m => !m.read).length;
    const badge = document.querySelector('.notification-badge');
    
    if (badge) {
      badge.textContent = unreadCount;
      if (unreadCount === 0) {
        badge.style.display = 'none';
      } else {
        badge.style.display = 'flex';
      }
    }
  }

  // Load and render products
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsTable = document.querySelector('.products-table');
    
    if (!productsTable) return;
    
    // Clear existing rows (except header)
    const rows = productsTable.querySelectorAll('.table-row:not(.table-header)');
    rows.forEach(row => row.remove());
    
    // Add products to table
    products.forEach(product => {
      const row = document.createElement('div');
      row.className = 'table-row';
      row.dataset.id = product.id;
      
      row.innerHTML = `
        <div class="product-cell">
          <div class="product-icon">${product.name.charAt(0)}</div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
          </div>
        </div>
        <div>₱${product.price}/${product.unit}</div>
        <div>
          <input type="number" value="${product.stock}" min="0" class="stock-input">
          <span>${product.unit}</span>
        </div>
        <div>${capitalizeFirstLetter(product.category)}</div>
        <div>${product.category2}</div>
        <div>
          <label class="toggle-switch">
            <input type="checkbox" ${product.status ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
          <span class="status-text">${product.status ? 'Available' : 'Unavailable'}</span>
        </div>
        <div class="actions-cell">
          <button class="btn btn-edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-remove"><i class="fas fa-trash"></i></button>
        </div>
      `;
      
      productsTable.appendChild(row);
      
      // Add event listeners for the new row
      setupProductRowEvents(row, product);
    });
  }

  // Setup event listeners for product row
  function setupProductRowEvents(row, product) {
    // Toggle switch
    const toggleSwitch = row.querySelector('.toggle-switch input');
    const statusText = row.querySelector('.status-text');
    
    toggleSwitch.addEventListener('change', function() {
      const products = JSON.parse(localStorage.getItem('products'));
      const index = products.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        products[index].status = this.checked;
        localStorage.setItem('products', JSON.stringify(products));
        statusText.textContent = this.checked ? 'Available' : 'Unavailable';
      }
    });
    
    // Stock input
    const stockInput = row.querySelector('.stock-input');
    stockInput.addEventListener('change', function() {
      const products = JSON.parse(localStorage.getItem('products'));
      const index = products.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        products[index].stock = parseInt(this.value);
        localStorage.setItem('products', JSON.stringify(products));
      }
    });
    
    // Edit button
    const editBtn = row.querySelector('.btn-edit');
    editBtn.addEventListener('click', function() {
      openEditProductModal(product);
    });
    
    // Delete button
    const deleteBtn = row.querySelector('.btn-remove');
    deleteBtn.addEventListener('click', function() {
      if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        const products = JSON.parse(localStorage.getItem('products'));
        const updatedProducts = products.filter(p => p.id !== product.id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        row.remove();
      }
    });
  }

  // Open edit product modal (also used for adding new products)
  function openEditProductModal(product = null) {
    const modal = document.getElementById('add-product-modal');
    const form = modal.querySelector('#product-form');
    
    if (product) {
      // Editing existing product
      modal.querySelector('.modal-header h3').textContent = 'Edit Product';
      form.dataset.mode = 'edit';
      form.dataset.id = product.id;
      
      // Fill form with product data
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-category').value = product.category;
      document.getElementById('product-category2').value = product.category2;
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-stock').value = product.stock;
      document.getElementById('product-unit').value = product.unit;
      document.getElementById('product-description').value = product.description || '';
    } else {
      // Adding new product
      modal.querySelector('.modal-header h3').textContent = 'Add New Product';
      form.dataset.mode = 'add';
      form.reset();
    }
    
    modal.classList.add('active');
  }

  // Product form submission
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const mode = this.dataset.mode;
      const id = this.dataset.id || 'P' + Math.random().toString(36).substr(2, 4).toUpperCase();
      
      const product = {
        id: id,
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        category2: document.getElementById('product-category2').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        unit: document.getElementById('product-unit').value,
        description: document.getElementById('product-description').value,
        status: true
      };
      
      const products = JSON.parse(localStorage.getItem('products')) || [];
      
      if (mode === 'edit') {
        // Update existing product
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
          products[index] = product;
        }
      } else {
        // Add new product
        products.push(product);
      }
      
      localStorage.setItem('products', JSON.stringify(products));
      loadProducts();
      this.closest('.modal').classList.remove('active');
    });
  }

  // Add product button
  const addProductBtn = document.getElementById('add-product');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', function() {
      openEditProductModal();
    });
  }

  // Quick add product button (from overview)
  const quickAddBtn = document.getElementById('quick-add-product');
  if (quickAddBtn) {
    quickAddBtn.addEventListener('click', function() {
      openEditProductModal();
    });
  }

  // Helper function
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

  const viewAllMessagesBtn = document.querySelector('.bottom-section .btn-text[data-tab="messages"]');
  if (viewAllMessagesBtn) {
    viewAllMessagesBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all nav items and tab contents
      document.querySelectorAll('.nav-item').forEach(navItem => navItem.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to Messages nav item
      document.querySelector('.nav-item[data-tab="messages"]').classList.add('active');
      
      // Show Messages tab content
      document.getElementById('messages').classList.add('active');
      
      // Load Messages content
      loadMessages();
    });
  }
  
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
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
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
  
  if (document.getElementById('salesChart')) {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Sales (₱)',
          data: [3500, 4200, 3800, 4500],
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          borderColor: 'rgba(255, 215, 0, 1)',
          borderWidth: 1
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
            'rgba(62, 167, 106, 0.7)',
            'rgba(255, 224, 102, 0.7)',
            'rgba(255, 82, 82, 0.7)',
            'rgba(113, 113, 113, 0.7)'
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
    if (form.id !== 'product-form') {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted! In a real application, this would save your data.');
        
        const modal = this.closest('.modal');
        if (modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // Logout
  const logoutBtn = document.querySelector('.logout-container');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = "../Landing Page/index.php";      
      }
    });
  }

  // Add this to the existing owner_dashboard.js file

  // Category Filter Functionality
  function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-filter .filter-btn');
    
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter products
        filterProducts(this.textContent.toLowerCase());
      });
    });
  }

  // Search Box Functionality
  function setupSearchBox() {
    const searchBox = document.querySelector('.search-box input');
    const searchIcon = document.querySelector('.search-box i');
    
    if (!searchBox) return;
    
    const searchHandler = () => {
      const searchTerm = searchBox.value.toLowerCase();
      filterProducts('all', searchTerm);
    };
    
    searchBox.addEventListener('input', searchHandler);
    searchIcon.addEventListener('click', searchHandler);
  }

  // Combined Filter Function
  // Update the filterProducts function to maintain the original table arrangement
  function filterProducts(category = 'all', searchTerm = '') {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsTable = document.querySelector('.products-table');
    
    if (!productsTable) return;
    
    // Clear existing rows (except header)
    const rows = productsTable.querySelectorAll('.table-row:not(.table-header)');
    rows.forEach(row => row.remove());
    
    // Filter products
    const filteredProducts = products.filter(product => {
      const categoryMatch = category === 'all' || product.category.toLowerCase() === category;
      const searchMatch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm) || 
        product.id.toLowerCase().includes(searchTerm);
      return categoryMatch && searchMatch;
    });
    
    // Add filtered products to table while maintaining original structure
    filteredProducts.forEach(product => {
      const row = document.createElement('div');
      row.className = 'table-row';
      row.dataset.id = product.id;
      
      row.innerHTML = `
        <div class="product-cell">
          <div class="product-icon">${product.name.charAt(0)}</div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
          </div>
        </div>
        <div>₱${product.price}/${product.unit}</div>
        <div>
          <input type="number" value="${product.stock}" min="0" class="stock-input">
          <span>${product.unit}</span>
        </div>
        <div>${capitalizeFirstLetter(product.category)}</div>
        <div>${product.category2}</div>
        <div>
          <label class="toggle-switch">
            <input type="checkbox" ${product.status ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
          <span class="status-text">${product.status ? 'Available' : 'Unavailable'}</span>
        </div>
        <div class="actions-cell">
          <button class="btn btn-edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-remove"><i class="fas fa-trash"></i></button>
        </div>
      `;
      
      productsTable.appendChild(row);
      setupProductRowEvents(row, product);
    });
  }

  // Update the loadProducts function to call these setup functions
  function loadProducts() {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const productsTable = document.querySelector('.products-table');
      
      if (!productsTable) return;
      
      // Clear existing rows (except header)
      const rows = productsTable.querySelectorAll('.table-row:not(.table-header)');
      rows.forEach(row => row.remove());
      
      // Add products to table
      products.forEach(product => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.dataset.id = product.id;
        
        row.innerHTML = `
          <div class="product-cell">
            <div class="product-icon">${product.name.charAt(0)}</div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <p>ID: ${product.id}</p>
            </div>
          </div>
          <div>₱${product.price}/${product.unit}</div>
          <div>
            <input type="number" value="${product.stock}" min="0" class="stock-input">
            <span>${product.unit}</span>
          </div>
          <div>${capitalizeFirstLetter(product.category)}</div>
          <div>${product.category2}</div>
          <div>
            <label class="toggle-switch">
              <input type="checkbox" ${product.status ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span class="status-text">${product.status ? 'Available' : 'Unavailable'}</span>
          </div>
          <div class="actions-cell">
            <button class="btn btn-edit"><i class="fas fa-edit"></i></button>
            <button class="btn btn-remove"><i class="fas fa-trash"></i></button>
          </div>
        `;
        
        productsTable.appendChild(row);
        setupProductRowEvents(row, product);
      });
      
      // Set up filter and search functionality
      setupCategoryFilter();
      setupSearchBox();
  }

  // Update the loadTabContent function to ensure these are set up when switching tabs
  function loadTabContent(tabId) {
      switch(tabId) {
        case 'products':
          loadProducts();
          break;
        case 'orders':
          loadOrders();
          break;
        case 'messages':
          loadMessages();
          break;
        case 'analytics':
          loadAnalytics();
          break;
        case 'settings':
          loadSettings();
          break;
        default:
          // Overview tab loads by default
          break;
      }
  }

  // Load initial tab (Overview)
  loadTabContent('overview');
  updateNotificationBadge();
});


function setupOrderSearch() {
  const searchBox = document.querySelector('.orders-management .search-box input');
  const searchIcon = document.querySelector('.orders-management .search-box i');
  
  if (!searchBox) return;
  
  const searchHandler = () => {
    const searchTerm = searchBox.value.toLowerCase();
    filterOrders(searchTerm);
  };
  
  searchBox.addEventListener('input', searchHandler);
  searchIcon.addEventListener('click', searchHandler);
}

// Function to filter orders based on search term
function filterOrders(searchTerm = '') {
  const ordersTable = document.querySelector('.orders-management .orders-table');
  if (!ordersTable) return;
  
  const rows = ordersTable.querySelectorAll('.table-row:not(.table-header)');
  
  rows.forEach(row => {
    const orderNumber = row.querySelector('div:nth-child(1)').textContent.toLowerCase();
    const customerName = row.querySelector('div:nth-child(2)').textContent.toLowerCase();
    const orderDate = row.querySelector('div:nth-child(3)').textContent.toLowerCase();
    const orderItems = row.querySelector('div:nth-child(4)').textContent.toLowerCase();
    const orderTotal = row.querySelector('div:nth-child(5)').textContent.toLowerCase();
    
    const matches = 
      orderNumber.includes(searchTerm) ||
      customerName.includes(searchTerm) ||
      orderDate.includes(searchTerm) ||
      orderItems.includes(searchTerm) ||
      orderTotal.includes(searchTerm);
    
    row.style.display = matches ? '' : 'none';
  });
}


function loadOrders() {
  // Your existing order loading code...
  
  // Set up search functionality
  setupOrderSearch();
}

// Update the loadTabContent function to ensure search is set up when switching to orders tab
function loadTabContent(tabId) {
  switch(tabId) {
    case 'products':
      loadProducts();
      break;
    case 'orders':
      loadOrders();
      break;
    case 'messages':
      loadMessages();
      break;
    case 'analytics':
      loadAnalytics();
      break;
    case 'settings':
      loadSettings();
      break;
    default:
      // Overview tab loads by default
      break;
  }
}



const orderFilterButtons = document.querySelectorAll('.order-filter .filter-btn');
const orderRows = document.querySelectorAll('.orders-management .table-row');

orderFilterButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all filter buttons
    orderFilterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    const filterValue = this.textContent.toLowerCase();
    
    // Filter order rows
    orderRows.forEach(row => {
      if (filterValue === 'all') {
        row.style.display = 'table-row';
      } else {
        const statusBadge = row.querySelector('.status-badge, .status-select');
        let statusText = '';
        
        if (statusBadge.classList.contains('status-badge')) {
          statusText = statusBadge.textContent.toLowerCase();
        } else if (statusBadge.classList.contains('status-select')) {
          statusText = statusBadge.value.toLowerCase();
        }
        
        if (statusText === filterValue) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      }
    });
  });
});

// Also add this to handle changes in the status dropdown
const statusSelects = document.querySelectorAll('.status-select');
statusSelects.forEach(select => {
  select.addEventListener('change', function() {
    const activeFilter = document.querySelector('.order-filter .filter-btn.active');
    if (activeFilter && activeFilter.textContent.toLowerCase() !== 'all') {
      const filterValue = activeFilter.textContent.toLowerCase();
      const row = this.closest('.table-row');
      const currentStatus = this.value.toLowerCase();
      
      if (currentStatus === filterValue) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    }
  });
});


  // Profile click handler to navigate to settings
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', function() {
      // Remove active class from all nav items and tab contents
      document.querySelectorAll('.nav-item').forEach(navItem => navItem.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to settings nav item
      document.querySelector('.nav-item[data-tab="settings"]').classList.add('active');
      
      // Show settings tab content
      document.getElementById('settings').classList.add('active');
      
      // Load settings content
      loadSettings();
    });
  }


  // Add this function to handle order cancellation
function setupOrderCancellation() {
  const cancelButtons = document.querySelectorAll('.orders-management .btn-remove');
  
  cancelButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      
      const row = this.closest('.table-row');
      const orderNumber = row.querySelector('div:first-child').textContent;
      
      if (confirm(`Are you sure you want to cancel order ${orderNumber}?`)) {
        // In a real app, you would send this to your backend
        // For now, we'll just remove it from the UI
        row.remove();
        
        // You could also update the status to "Cancelled" instead of removing
        // const statusCell = row.querySelector('div:nth-child(6)');
        // statusCell.innerHTML = '<span class="status-badge cancelled">Cancelled</span>';
        // this.disabled = true;
      }
    });
  });
}

// Update the loadOrders function to include cancellation setup
function loadOrders() {
  // Your existing order loading code...
  
  // Set up search functionality
  setupOrderSearch();
  
  // Set up order cancellation
  setupOrderCancellation();
  
  // Set up status filter
  setupOrderStatusFilter();
}

// Add this function for status filtering
function setupOrderStatusFilter() {
  const orderFilterButtons = document.querySelectorAll('.order-filter .filter-btn');
  
  orderFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all filter buttons
      orderFilterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.textContent.toLowerCase();
      const orderRows = document.querySelectorAll('.orders-management .table-row:not(.table-header)');
      
      orderRows.forEach(row => {
        if (filterValue === 'all') {
          row.style.display = 'table-row';
        } else {
          const statusElement = row.querySelector('.status-badge, .status-select');
          let statusText = '';
          
          if (statusElement.classList.contains('status-badge')) {
            statusText = statusElement.textContent.toLowerCase();
          } else if (statusElement.classList.contains('status-select')) {
            statusText = statusElement.value.toLowerCase();
          }
          
          row.style.display = statusText === filterValue ? 'table-row' : 'none';
        }
      });
    });
  });
  
  // Handle status select changes
  const statusSelects = document.querySelectorAll('.status-select');
  statusSelects.forEach(select => {
    select.addEventListener('change', function() {
      const activeFilter = document.querySelector('.order-filter .filter-btn.active');
      if (activeFilter && activeFilter.textContent.toLowerCase() !== 'all') {
        const row = this.closest('.table-row');
        const currentStatus = this.value.toLowerCase();
        const filterValue = activeFilter.textContent.toLowerCase();
        
        row.style.display = currentStatus === filterValue ? 'table-row' : 'none';
      }
      
      // Update the status badge if it exists
      const statusBadge = this.closest('div').querySelector('.status-badge');
      if (statusBadge) {
        statusBadge.className = 'status-badge ' + this.value;
        statusBadge.textContent = this.options[this.selectedIndex].text;
      }
    });
  });
}