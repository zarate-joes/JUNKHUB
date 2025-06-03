/**
 * JunkHUB Owner Dashboard - Complete Integration
 * Handles all data flows from signup → shop creation → dashboard
 */

// ======================
// CORE DATA FUNCTIONS
// ======================

/**
 * Loads all dashboard data from backend
 */
async function loadDashboardData() {
    try {
        showLoader();
        
        const response = await fetch('../Backend/dashboard.php');
        const data = await response.json();
        
        if (data.success) {
            // Handle incomplete shop setup
            if (!data.data.business_id) {
                renderSetupReminder();
                return;
            }
            
            // Update UI with loaded data
            updateOwnerInfo(data.data);
            updateBusinessStats(data.data);
            updateRecentOrders(data.data.recent_orders || []);
            updateRecentMessages(data.data.recent_messages || []);
            
        } else {
            showError(data.error || 'Failed to load dashboard data');
        }
    } catch (error) {
        console.error('Dashboard load error:', error);
        showError('Network error - please try again');
    } finally {
        hideLoader();
    }
}

/**
 * Updates owner information in the UI
 */
function updateOwnerInfo(ownerData) {
    // Header profile
    const usernameEl = document.querySelector('.username');
    if (usernameEl && ownerData.first_name && ownerData.last_name) {
        usernameEl.textContent = `${ownerData.first_name} ${ownerData.last_name}`;
    }
    
    // Update profile image if exists
    if (ownerData.profile_image) {
        const profileImg = document.querySelector('.user-profile img');
        if (profileImg) {
            profileImg.src = `../uploads/profiles/${ownerData.profile_image}`;
        }
    }
}

/**
 * Updates business statistics
 */
function updateBusinessStats(data) {
    if (!data.statistics) return;
    
    // Sales card
    const salesValue = document.querySelector('.stats-card .stats-value');
    if (salesValue) {
        salesValue.textContent = `₱${data.statistics.total_sales?.toLocaleString() || '0'}`;
    }
    
    // Products card - find the second stats card
    const statsCards = document.querySelectorAll('.stats-card .stats-value');
    if (statsCards[1]) {
        statsCards[1].textContent = data.statistics.product_count || '0';
    }
    
    // Orders card - find the third stats card
    if (statsCards[2]) {
        statsCards[2].textContent = data.statistics.pending_orders || '0';
    }
}

function updateRecentOrders(orders) {
    const ordersContainer = document.querySelector('.orders-table');
    if (!ordersContainer) return;
    
    // Keep the header, replace the rows
    const header = ordersContainer.querySelector('.table-header');
    ordersContainer.innerHTML = '';
    ordersContainer.appendChild(header);
    
    orders.forEach(order => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div>#${order.order_id}</div>
            <div>${order.customer_name}</div>
            <div>${order.items}</div>
            <div>${order.order_date}</div>
            <div><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></div>
            <div><button class="btn btn-sm" onclick="viewOrder('${order.order_id}')">View</button></div>
        `;
        ordersContainer.appendChild(row);
    });
}

function updateRecentMessages(messages) {
    const messagesContainer = document.querySelector('.messages-container .message-card');
    if (!messagesContainer) return;
    
    const parent = messagesContainer.parentNode;
    // Clear existing messages except header
    const header = parent.querySelector('.section-header');
    parent.innerHTML = '';
    parent.appendChild(header);
    
    messages.forEach(message => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-header">
                <h3>${message.subject}</h3>
                <span class="message-time">${message.time}</span>
            </div>
            <p class="message-preview">${message.content.substring(0, 100)}...</p>
            <div class="message-footer">
                <span>From: ${message.from}</span>
            </div>
        `;
        parent.appendChild(messageCard);
    });
}

// ======================
// SHOP SETUP HANDLING
// ======================

function renderSetupReminder() {
    document.querySelector('.main-content').innerHTML = `
        <div class="setup-reminder">
            <div class="reminder-card">
                <i class="fas fa-store-alt"></i>
                <h2>Ready to Start Selling?</h2>
                <p>Set up your shop to begin accepting orders and managing inventory</p>
                <div class="setup-progress">
                    <div class="progress-step completed">
                        <span>1</span>
                        <p>Account Created</p>
                    </div>
                    <div class="progress-connector"></div>
                    <div class="progress-step current">
                        <span>2</span>
                        <p>Shop Setup</p>
                    </div>
                </div>
                <a href="../Owner Registration/shopsignup.php" class="btn btn-primary btn-lg">
                    <i class="fas fa-store"></i> Set Up Your Shop
                </a>
            </div>
        </div>
    `;
}

// ======================
// PRODUCT MANAGEMENT
// ======================

async function loadProducts() {
    try {
        showLoader();
        const response = await fetch('../Backend/get_products.php');
        const data = await response.json();
        
        if (data.success) {
            renderProductsTable(data.data);
        } else {
            showError('Failed to load products');
        }
    } catch (error) {
        showError('Network error loading products');
    } finally {
        hideLoader();
    }
}

function renderProductsTable(products) {
    const tableContainer = document.querySelector('.products-table');
    if (!tableContainer) return;
    
    // Keep the header
    const header = tableContainer.querySelector('.table-header');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(header);
    
    products.forEach(product => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div class="product-cell">
                <div class="product-icon">${product.name.charAt(0)}</div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>ID: ${product.product_id}</p>
                </div>
            </div>
            <div>₱${product.price}/${product.unit}</div>
            <div>
                <input type="number" value="${product.stock}" min="0" class="stock-input" 
                       onchange="updateStock('${product.product_id}', this.value)">
                <span>${product.unit}</span>
            </div>
            <div>${product.category}</div>
            <div>${product.category2}</div>
            <div>
                <label class="toggle-switch">
                    <input type="checkbox" ${product.status === 'active' ? 'checked' : ''} 
                           onchange="toggleProductStatus('${product.product_id}', this.checked)">
                    <span class="slider"></span>
                </label>
                <span class="status-text">${product.status === 'active' ? 'Available' : 'Unavailable'}</span>
            </div>
            <div class="actions-cell">
                <button class="btn btn-edit" onclick="editProduct('${product.product_id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-remove" onclick="deleteProduct('${product.product_id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        tableContainer.appendChild(row);
    });
}

async function saveProduct(formData) {
    try {
        showLoader();
        const response = await fetch('../Backend/save_products.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        // Check for HTTP errors
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Product saved successfully');
            loadProducts();
            closeModal('add-product-modal');
        } else {
            // Show validation errors if they exist
            if (result.errors) {
                const errorMessages = Object.values(result.errors).join('\n');
                showError(errorMessages);
            } else {
                showError(result.error || 'Failed to save product');
            }
        }
    } catch (error) {
        console.error('Save error:', error);
        showError('Failed to save product: ' + error.message);
    } finally {
        hideLoader();
    }
}

async function updateStock(productId, newStock) {
    try {
        const response = await fetch('../Backend/update_stock.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: productId,
                stock: newStock
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Stock updated');
        } else {
            showError('Failed to update stock');
            loadProducts(); // Reload to reset the input
        }
    } catch (error) {
        showError('Network error');
    }
}

async function toggleProductStatus(productId, isActive) {
    try {
        const response = await fetch('../Backend/toggle_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: productId,
                status: isActive ? 'active' : 'inactive'
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Product status updated');
        } else {
            showError('Failed to update status');
            loadProducts();
        }
    } catch (error) {
        showError('Network error');
    }
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        const response = await fetch('../Backend/delete_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Product deleted');
            loadProducts();
        } else {
            showError('Failed to delete product');
        }
    } catch (error) {
        showError('Network error');
    }
}

// ======================
// ORDER MANAGEMENT
// ======================

async function loadOrders() {
    try {
        showLoader();
        const response = await fetch('../Backend/get_orders.php');
        const data = await response.json();
        
        if (data.success) {
            renderOrdersTable(data.data);
            updateOrderSummary(data.summary);
        } else {
            showError('Failed to load orders');
        }
    } catch (error) {
        showError('Network error loading orders');
    } finally {
        hideLoader();
    }
}

function renderOrdersTable(orders) {
    const tableContainer = document.querySelector('#orders .orders-table');
    if (!tableContainer) return;
    
    const header = tableContainer.querySelector('.table-header');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(header);
    
    orders.forEach(order => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div>#${order.order_id}</div>
            <div>
                <div class="user-profile">
                    <img src="../Dashboard/pngs/prof.png" alt="User" width="30">
                    <span>${order.customer_name}</span>
                </div>
            </div>
            <div>${order.order_date}</div>
            <div>${order.items_count} items</div>
            <div>₱${order.total}</div>
            <div>
                <select class="status-select" onchange="updateOrderStatus('${order.order_id}', this.value)">
                    <option value="new" ${order.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="accepted" ${order.status === 'accepted' ? 'selected' : ''}>Accepted</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </div>
            <div class="order-actions">
                <button class="btn btn-sm" onclick="viewOrderDetails('${order.order_id}')">View</button>
                <button class="btn btn-sm btn-remove" onclick="cancelOrder('${order.order_id}')" 
                        ${order.status === 'completed' || order.status === 'cancelled' ? 'disabled' : ''}>
                    Cancel
                </button>
            </div>
        `;
        tableContainer.appendChild(row);
    });
}

function updateOrderSummary(summary) {
    const summaryCards = document.querySelectorAll('.order-summary .summary-value');
    if (summaryCards.length >= 4) {
        summaryCards[0].textContent = summary.total || '0';
        summaryCards[1].textContent = summary.completed || '0';
        summaryCards[2].textContent = summary.pending || '0';
        summaryCards[3].textContent = summary.cancelled || '0';
    }
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        const response = await fetch('../Backend/update_order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: orderId,
                status: newStatus
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Order status updated');
            loadOrders();
        } else {
            showError(result.error || 'Update failed');
        }
    } catch (error) {
        showError('Network error during order update');
    }
}

async function cancelOrder(orderId) {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    await updateOrderStatus(orderId, 'cancelled');
}

function viewOrderDetails(orderId) {
    // This would typically load order details and show in modal
    openModal('order-details-modal');
}

// ======================
// MESSAGE HANDLING
// ======================

let messagesData = [];

async function loadMessages() {
    try {
        showLoader();
        const response = await fetch('../Backend/get_messages.php');
        const data = await response.json();
        
        if (data.success) {
            messagesData = data.data;
            renderMessages(messagesData);
        } else {
            showError('Failed to load messages');
        }
    } catch (error) {
        showError('Network error loading messages');
    } finally {
        hideLoader();
    }
}

function renderMessages(messages) {
    const container = document.getElementById('messages-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-card ${!message.read ? 'unread' : ''}`;
        messageDiv.innerHTML = `
            <div class="message-header">
                <h3>${message.subject}</h3>
                <span class="message-time">${message.time}</span>
                <span class="message-type ${message.type}">${message.type}</span>
            </div>
            <p class="message-preview">${message.content}</p>
            <div class="message-footer">
                <span>From: ${message.from}</span>
                <div class="message-actions">
                    <button class="btn btn-sm" onclick="replyToMessage('${message.id}')">Reply</button>
                    <button class="btn btn-sm" onclick="markAsRead('${message.id}')">
                        ${message.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                </div>
            </div>
        `;
        container.appendChild(messageDiv);
    });
}

function replyToMessage(messageId) {
    const message = messagesData.find(m => m.id === messageId);
    if (!message) return;
    
    document.getElementById('reply-to').textContent = message.from;
    document.getElementById('reply-subject').textContent = `Re: ${message.subject}`;
    openModal('reply-modal');
}

async function markAsRead(messageId) {
    try {
        const response = await fetch('../Backend/mark_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message_id: messageId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            loadMessages();
        }
    } catch (error) {
        showError('Network error');
    }
}

// ======================
// SETTINGS MANAGEMENT
// ======================

async function loadSettings() {
    try {
        const response = await fetch('../Backend/get_settings.php');
        const data = await response.json();
        
        if (data.success) {
            populateSettingsForm(data.data);
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
    }
}

function populateSettingsForm(settings) {
    document.getElementById('account-name').value = settings.full_name || '';
    document.getElementById('account-email').value = settings.email || '';
    document.getElementById('account-phone').value = settings.phone || '';
    document.getElementById('account-business').value = settings.business_name || '';
    document.getElementById('account-address').value = settings.address || '';
    document.getElementById('shop-description').value = settings.description || '';
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('full_name', document.getElementById('account-name').value);
    formData.append('email', document.getElementById('account-email').value);
    formData.append('phone', document.getElementById('account-phone').value);
    formData.append('business_name', document.getElementById('account-business').value);
    formData.append('address', document.getElementById('account-address').value);
    formData.append('description', document.getElementById('shop-description').value);
    
    const logoFile = document.getElementById('shop-logo').files[0];
    if (logoFile) {
        formData.append('logo', logoFile);
    }
    
    try {
        const response = await fetch('../Backend/update_profile.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Profile updated successfully');
            loadDashboardData();
        } else {
            showError(result.error || 'Update failed');
        }
    } catch (error) {
        showError('Network error during update');
    }
}

async function handlePasswordChange(e) {
    e.preventDefault();
    
    const formData = {
        currentPassword: document.getElementById('current-password').value,
        newPassword: document.getElementById('new-password').value,
        confirmPassword: document.getElementById('confirm-password').value
    };
    
    if (formData.newPassword !== formData.confirmPassword) {
        showError('New passwords do not match');
        return;
    }
    
    try {
        const response = await fetch('../Backend/update_password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Password updated successfully');
            document.getElementById('security-form').reset();
        } else {
            showError(result.error || 'Password update failed');
        }
    } catch (error) {
        showError('Network error during password change');
    }
}

// ======================
// UI HELPERS
// ======================

function showLoader() {
    // Create loader if doesn't exist
    let loader = document.querySelector('.loading-overlay');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = '<div class="spinner"></div>';
        loader.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); display: flex; align-items: center;
            justify-content: center; z-index: 9999;
        `;
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
}

function hideLoader() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.style.display = 'none';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #4CAF50;
        color: white; padding: 12px 24px; border-radius: 4px; z-index: 10000;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'error-notification';
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #f44336;
        color: white; padding: 12px 24px; border-radius: 4px; z-index: 10000;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// ======================
// SEARCH AND FILTER
// ======================

function setupSearchBox() {
    const searchBox = document.querySelector('#products .search-box input');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            filterProducts(this.value);
        });
    }
}

function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('#products .category-filter .filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProductsByCategory(this.textContent);
        });
    });
}

function filterProducts(searchTerm) {
    const rows = document.querySelectorAll('#products .products-table .table-row');
    rows.forEach(row => {
        const productName = row.querySelector('.product-info h3').textContent.toLowerCase();
        if (productName.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterProductsByCategory(category) {
    const rows = document.querySelectorAll('#products .products-table .table-row');
    rows.forEach(row => {
        const cells = row.querySelectorAll('div');
        if (cells.length > 3) {
            const productCategory = cells[3].textContent;
            if (category === 'All' || productCategory === category) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// ======================
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    // Initial data load
    loadDashboardData();
    
    // Tab navigation
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            
            const tabId = this.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
                loadTabContent(tabId);
            }
        });
    });

    // Settings tabs
    const settingsTabs = document.querySelectorAll('.settings-tabs .tab-btn');
    const settingsPanes = document.querySelectorAll('.tab-pane');
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            settingsTabs.forEach(t => t.classList.remove('active'));
            settingsPanes.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            const paneId = this.getAttribute('data-tab') + '-settings';
            const pane = document.getElementById(paneId);
            if (pane) {
                pane.classList.add('active');
            }
        });
    });
    
    // Modal handling
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Add product button
    const addProductBtn = document.getElementById('add-product');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => openModal('add-product-modal'));
    }
    
    // Product form submission
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('product-name').value,
                category: document.getElementById('product-category').value,
                category2: document.getElementById('product-category2').value,
                price: document.getElementById('product-price').value,
                stock: document.getElementById('product-stock').value,
                unit: document.getElementById('product-unit').value,
                description: document.getElementById('product-description').value
            };
            
            saveProduct(formData);
        });
    }
    
    // Profile form submission
    const accountForm = document.querySelector('#account-settings .settings-form');
    if (accountForm) {
        accountForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Security form submission
    const securityForm = document.querySelector('#security-settings .settings-form');
    if (securityForm) {
        securityForm.addEventListener('submit', handlePasswordChange);
    }
    
    // Reply form submission
    const replyForm = document.getElementById('reply-form');
    if (replyForm) {
        replyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle reply submission
            showToast('Reply sent successfully');
            closeModal('reply-modal');
            this.reset();
        });
    }
    
    // Logo upload preview
    const logoInput = document.getElementById('shop-logo');
    if (logoInput) {
        logoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('logo-preview');
                    if (preview) {
                        preview.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Auto-refresh every 2 minutes
    setInterval(loadDashboardData, 120000);
});

function loadTabContent(tabId) {
    switch(tabId) {
        case 'overview':
            loadDashboardData();
            break;
        case 'products':
            loadProducts();
            setupCategoryFilter();
            setupSearchBox();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}