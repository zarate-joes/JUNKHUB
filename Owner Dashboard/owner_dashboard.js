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
            <div class="product-image-cell">
                ${product.image ? 
                    `<img src="../uploads/products/${product.image}" alt="${product.name}" width="50">` : 
                    `<div class="product-icon">${product.name.charAt(0)}</div>`
                }
            </div>
            <div class="product-cell">
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

        // Handle file upload
        const imageInput = document.getElementById('product-image');
        if (imageInput.files.length > 0) {
            formData.image = imageInput.files[0];
        }
        
        // Check if we're in edit mode
        const form = document.getElementById('product-form');
        const isEdit = form.dataset.editMode === 'true';
        
        // Create FormData for file upload
        const fd = new FormData();
        for (const key in formData) {
            if (formData[key] instanceof File) {
                fd.append(key, formData[key]);
            } else {
                fd.append(key, formData[key]);
            }
        }
        
        // Add product ID if editing
        if (isEdit) {
            fd.append('product_id', form.dataset.productId);
        }
        
        // Determine the endpoint
        const endpoint = isEdit ? '../Backend/edit_product.php' : '../Backend/save_products.php';
        
        const response = await fetch(endpoint, {
            method: 'POST',
            body: fd
        });
        
        // First check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Server returned: ${text.substring(0, 100)}`);
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showToast(isEdit ? 'Product updated successfully' : 'Product saved successfully');
            loadProducts();
            closeModal('add-product-modal');
            form.reset();
            document.getElementById('product-image-preview').style.display = 'none';
            
            // Reset edit mode
            delete form.dataset.editMode;
            delete form.dataset.productId;
            
            // Reset modal title
            const modalTitle = document.querySelector('#add-product-modal h3');
            if (modalTitle) modalTitle.textContent = 'Add New Product';
        } else {
            if (result.errors) {
                const errorMessages = Object.values(result.errors).join('\n');
                showError(errorMessages);
            } else {
                showError(result.error || (isEdit ? 'Failed to update product' : 'Failed to save product'));
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
        showError('Network error2');
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
        showError('Network error3');
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
        showError('Network error4');
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
        showError('Network error1');
    }
}

// ======================
// SETTINGS MANAGEMENT
// ======================

async function loadSettings() {
    try {
        showLoader();
        const response = await fetch('../Backend/get_settings.php');
        const data = await response.json();
        
        if (data.success) {
            populateSettingsForm(data.data);
        } else {
            showError(data.error || 'Failed to load settings');
        }
    } catch (error) {
        console.error('Settings load error:', error);
        showError('Network error loading settings');
    } finally {
        hideLoader();
    }
}

// Add this function to populate the form
function populateSettingsForm(settings) {
    // Owner Information
    if (settings.owner.first_name && settings.owner.last_name) {
        document.getElementById('account-name').value = `${settings.owner.first_name} ${settings.owner.last_name}`;
    } else {
        document.getElementById('account-name').value = '';
    }
    document.getElementById('account-email').value = settings.owner.email;
    document.getElementById('account-phone').value = settings.owner.phone;

    // Business Information
    if (settings.business) {
        document.getElementById('account-business').value = settings.business.business_name || '';
        document.getElementById('shop-description').value = settings.business.description || '';
        document.getElementById('account-address').value = settings.business.address || '';
        document.getElementById('account-barangay').value = settings.business.barangay || ''; // Add this line

        // Business Hours - parse the hours string if it exists
        if (settings.business.business_hours) {
            try {
                const hoursParts = settings.business.business_hours.split('-');
                if (hoursParts.length === 2) {
                    const openTime = convertTo24HourFormat(hoursParts[0].trim());
                    const closeTime = convertTo24HourFormat(hoursParts[1].trim());
                    
                    document.getElementById('weekday-open').value = openTime;
                    document.getElementById('weekday-close').value = closeTime;
                }
            } catch (e) {
                console.error('Error parsing business hours:', e);
            }
        }

        // Logo preview
        const logoPreview = document.getElementById('logo-preview');
        if (logoPreview) {
            if (settings.business.logo_path) {
                logoPreview.src = `${settings.business.logo_path}`;
            } else {
                logoPreview.src = '../Dashboard/pngs/prof.png';
            }
        }
        
        // Populate materials grid
        const materialsGrid = document.querySelector('.materials-grid');
        if (materialsGrid) {
            const materials = [
                { id: 'material-plastic', value: 'plastic', label: 'Plastic', icon: '♻️' },
                { id: 'material-paper', value: 'paper', label: 'Paper', icon: '📄' },
                { id: 'material-metal', value: 'metal', label: 'Metal', icon: '🔩' },
                { id: 'material-glass', value: 'glass', label: 'Glass', icon: '🍶' },
                { id: 'material-electronics', value: 'electronics', label: 'Electronics', icon: '💻' },
                { id: 'material-textiles', value: 'textiles', label: 'Textiles', icon: '👕' }
            ];
            
            materialsGrid.innerHTML = '';
            materials.forEach(material => {
                const isChecked = settings.materials && settings.materials.includes(material.value);
                materialsGrid.innerHTML += `
                    <div class="material-item">
                        <input type="checkbox" id="${material.id}" name="materials[]" value="${material.value}" ${isChecked ? 'checked' : ''}>
                        <label for="${material.id}">
                            <span class="material-icon">${material.icon}</span>
                            <span class="material-name">${material.label}</span>
                        </label>
                    </div>
                `;
            });
        }
    }

    // Profile image in header
    const profileImage = document.querySelector('.user-profile img');
    if (profileImage && settings.owner.profile_image) {
        profileImage.src = `../uploads/profiles/${settings.owner.profile_image}`;
    }
}


// Helper function to convert AM/PM to 24-hour format
function convertTo24HourFormat(timeStr) {
    if (!timeStr) return '';
    
    // If already in 24-hour format (HH:MM)
    if (/^\d{2}:\d{2}$/.test(timeStr)) {
        return timeStr;
    }
    
    // Handle AM/PM format
    const time = timeStr.toLowerCase();
    const [timePart, period] = time.split(/(am|pm)/);
    let [hours, minutes] = timePart.split(':').map(Number);
    
    if (period === 'pm' && hours < 12) {
        hours += 12;
    } else if (period === 'am' && hours === 12) {
        hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${(minutes || 0).toString().padStart(2, '0')}`;
}

// Helper function to safely set form values
function setValueIfExists(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.value = value || '';
    }
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    
    try {
        showLoader();
        
        const formData = new FormData();
        
        // Get name parts - make them optional for updates
        const fullName = document.getElementById('account-name').value.trim();
        if (fullName) {
            const nameParts = fullName.split(' ');
            formData.append('first_name', nameParts[0]);
            formData.append('last_name', nameParts.slice(1).join(' ') || '');
        }
        
        formData.append('email', document.getElementById('account-email').value);
        formData.append('phone', document.getElementById('account-phone').value);
        
        // Business information
        formData.append('business_name', document.getElementById('account-business').value);
        formData.append('description', document.getElementById('shop-description').value);
        formData.append('address', document.getElementById('account-address').value);
        formData.append('barangay', document.getElementById('account-barangay').value);
        
        // Business hours
        const weekdayOpen = document.getElementById('weekday-open').value;
        const weekdayClose = document.getElementById('weekday-close').value;
        formData.append('business_hours', `${weekdayOpen}-${weekdayClose}`);
        
        // Collect materials
        const materials = [];
        document.querySelectorAll('input[name="materials[]"]:checked').forEach(checkbox => {
            materials.push(checkbox.value);
        });
        formData.append('materials', JSON.stringify(materials));
        
        // Handle logo upload
        const logoInput = document.getElementById('shop-logo');
        if (logoInput.files.length > 0) {
            formData.append('logo', logoInput.files[0]);
        }
        
        // Send to server
        const response = await fetch('../Backend/update_profile.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Profile updated successfully');
            loadSettings();
        } else {
            showError(result.error || 'Failed to update profile');
        }
    } catch (error) {
        console.error('Update error:', error);
        showError('Failed to update profile: ' + error.message);
    } finally {
        hideLoader();
    }
}

function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength++;
    
    // Contains number
    if (/[0-9]/.test(password)) strength++;
    
    // Contains special char
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

// Add this to your initialization code
function setupPasswordVisibilityToggle() {
    // Wait for security tab to be active
    document.querySelector('.tab-btn[data-tab="security"]').addEventListener('click', function() {
        // Give a small delay to ensure the inputs are visible
        setTimeout(() => {
            const passwordInputs = document.querySelectorAll('#security-settings input[type="password"]');
            
            passwordInputs.forEach(input => {
                // Skip if already has toggle
                if (input.parentNode.querySelector('.password-toggle')) return;
                
                const container = document.createElement('div');
                container.style.position = 'relative';
                container.style.display = 'inline-block';
                container.style.width = '100%';
                
                // Wrap the input in the container
                input.parentNode.insertBefore(container, input);
                container.appendChild(input);
                
                // Add some padding to the input to make space for the icon
                input.style.paddingRight = '35px';
                
                // Create the toggle button
                const toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 'password-toggle';
                toggle.innerHTML = '<i class="fas fa-eye"></i>';
                toggle.style.cssText = `
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #666;
                    padding: 5px;
                `;
                
                // Add hover effect
                toggle.addEventListener('mouseenter', () => {
                    toggle.style.color = '#333';
                });
                toggle.addEventListener('mouseleave', () => {
                    toggle.style.color = '#666';
                });
                
                // Toggle password visibility
                toggle.addEventListener('click', () => {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    
                    // Update icon
                    const icon = toggle.querySelector('i');
                    if (type === 'password') {
                        icon.className = 'fas fa-eye';
                        icon.setAttribute('title', 'Show password');
                    } else {
                        icon.className = 'fas fa-eye-slash';
                        icon.setAttribute('title', 'Hide password');
                    }
                });
                
                container.appendChild(toggle);
            });
        }, 100);
    });
}

async function handlePasswordChange(e) {
    e.preventDefault();

    // Show confirmation dialog
    if (!confirm("Are you sure you want to change your password?")) {
        return;
    }

    const currentPassword = document.getElementById('current-password').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Client-side validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showError('All fields are required.');
        return;
    }

    if (newPassword.length < 8) {
        showError('Password must be at least 8 characters.');
        return;
    }

    if (newPassword !== confirmPassword) {
        showError('New passwords do not match.');
        return;
    }

    const strength = checkPasswordStrength(newPassword);
    if (strength < 3) {
        showError('Password is too weak. Include uppercase, lowercase, numbers, and special characters.');
        return;
    }

    showLoader();

    try {
        const response = await fetch('../Backend/update_password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                currentPassword, 
                newPassword, 
                confirmPassword 
            })
        });

        const result = await response.json();
        
        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Password update failed.');
        }

        showToast('Password updated successfully!');
        document.getElementById('security-form').reset();
        
        // Optional: Auto-logout after successful change
        setTimeout(() => {
            window.location.href = '../Backend/logout.php?password_changed=1';
        }, 2000);
        
    } catch (error) {
        console.error('Password change error:', error);
        showError(error.message || 'Failed to update password. Please try again.');
    } finally {
        hideLoader();
    }
}


async function editProduct(productId) {
    try {
        showLoader();
        
        // Fetch product data
        const response = await fetch('../Backend/get_oneproduct.php?id=' + productId);
        const data = await response.json();
        
        if (data.success) {
            // Populate the form
            document.getElementById('product-name').value = data.data.name;
            document.getElementById('product-category').value = data.data.category;
            document.getElementById('product-category2').value = data.data.category2;
            document.getElementById('product-price').value = data.data.price;
            document.getElementById('product-stock').value = data.data.stock;
            document.getElementById('product-unit').value = data.data.unit;
            document.getElementById('product-description').value = data.data.description || '';
            
            // Set the current status
            const statusCheckbox = document.querySelector('#add-product-modal input[type="checkbox"]');
            if (statusCheckbox) {
                statusCheckbox.checked = data.data.status === 'active';
            }
            
            // Show image preview if exists
            const previewContainer = document.getElementById('product-image-preview');
            const previewImg = document.getElementById('product-preview-img');
            if (data.data.image) {
                previewImg.src = `../uploads/products/${data.data.image}`;
                previewContainer.style.display = 'block';
            } else {
                previewContainer.style.display = 'none';
            }
            
            // Update the form to know we're editing
            const form = document.getElementById('product-form');
            form.dataset.editMode = 'true';
            form.dataset.productId = productId;
            
            // Update modal title
            const modalTitle = document.querySelector('#add-product-modal h3');
            if (modalTitle) modalTitle.textContent = 'Edit Product';
            
            openModal('add-product-modal');
        } else {
            showError(data.error || 'Failed to load product data');
        }
    } catch (error) {
        showError('Network error loading product data');
    } finally {
        hideLoader();
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
    const rows = document.querySelectorAll('#products .products-table .table-row:not(.table-header)');
    const activeCategory = document.querySelector('#products .category-filter .filter-btn.active')?.textContent;
    
    rows.forEach(row => {
        const productName = row.querySelector('.product-info h3')?.textContent.toLowerCase() || '';
        const productId = row.querySelector('.product-info p')?.textContent.toLowerCase() || '';
        
        // Check if product matches search term AND active category filter
        const matchesSearch = productName.includes(searchTerm.toLowerCase()) || 
                             productId.includes(searchTerm.toLowerCase());
        
        const matchesCategory = activeCategory === 'All' || 
                               row.querySelector('div:nth-child(5)')?.textContent === activeCategory ||
                               row.querySelector('div:nth-child(6)')?.textContent === activeCategory;
        
        if (matchesSearch && matchesCategory) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterProductsByCategory(category) {
    const rows = document.querySelectorAll('#products .products-table .table-row:not(.table-header)');
    rows.forEach(row => {
        // Get the category cell - it should be the 5th cell (index 4) based on your table structure
        const categoryCell = row.querySelector('div:nth-child(5)'); // 5th column is category
        const secondaryCategoryCell = row.querySelector('div:nth-child(6)'); // 6th column is category2
        
        if (category === 'All') {
            row.style.display = '';
        } else if (categoryCell && (categoryCell.textContent === category || 
                  (secondaryCategoryCell && secondaryCategoryCell.textContent === category))) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// ======================
// LOGOUT FUNCTIONALITY
// ======================

function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutConfirmation();
        });
    }
}

function showLogoutConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'logout-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    modal.innerHTML = `
        <div class="logout-modal-content" style="
            background: white;
            padding: 24px;
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        ">
            <h3 style="margin-top: 0;">Confirm Logout</h3>
            <p>Are you sure you want to logout from your account?</p>
            <div style="display: flex; justify-content: center; gap: 12px; margin-top: 24px;">
                <button id="cancel-logout" style="
                    padding: 8px 16px;
                    background: #f0f0f0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                ">Cancel</button>
                <button id="confirm-logout" style="
                    padding: 8px 16px;
                    background: #f44336;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                ">Logout</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('cancel-logout').addEventListener('click', function() {
        modal.remove();
    });
    
    document.getElementById('confirm-logout').addEventListener('click', function() {
        window.location.href = '../Backend/logout.php';
    });
}

// ======================
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    // Initial data load
    loadDashboardData();
    setupLogout();
    setupPasswordVisibilityToggle();

    // Add password strength meter
    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            updatePasswordStrengthMeter(strength);
        });
    }

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
                description: document.getElementById('product-description').value,
                status: document.getElementById('product-status').checked ? 'active' : 'inactive'
            };
            
            saveProduct(formData);
        });
    }
    
    // Profile form submission
    const accountForm = document.querySelector('#account-settings .settings-form');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate(e);
        });
    }
    
    // Security form submission
    const securityForm = document.querySelector('#security-settings .settings-form');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePasswordChange(e);
        });
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

    // Add this to the DOMContentLoaded event listener
    const productImageInput = document.getElementById('product-image');
    if (productImageInput) {
        productImageInput.addEventListener('change', function() {
            const preview = document.getElementById('product-preview-img');
            const previewContainer = document.getElementById('product-image-preview');
            
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    previewContainer.style.display = 'block';
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const settingsForm = document.querySelector('#account-settings .settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleProfileUpdate);
    }    
    // Cancel button
    const cancelBtn = document.querySelector('#account-settings .btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Reload settings to discard changes
            loadSettings();
        });
    }

    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            // Find and click the messages tab
            const messagesTab = document.querySelector('.nav-item[data-tab="messages"]');
            if (messagesTab) messagesTab.click();
        });
    }

    // Add click handler for user profile
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Find and click the settings tab
            const settingsTab = document.querySelector('.nav-item[data-tab="settings"]');
            if (settingsTab) settingsTab.click();
        });
    }

    // Initialize search and filter with 'All' category selected by default
    const categoryFilter = document.querySelector('#products .category-filter');
    if (categoryFilter) {
        // Add 'All' button if it doesn't exist
        if (!categoryFilter.querySelector('.filter-btn[data-category="All"]')) {
            allButton.setAttribute('data-category', 'All');
            categoryFilter.prepend(allButton);
        }
        
        setupCategoryFilter();
    }
    
    setupSearchBox();
    

    
    // Auto-refresh every 2 minutes
    setInterval(loadDashboardData, 120000);
});

function updatePasswordStrengthMeter(strength) {
    const newPasswordInput = document.getElementById('new-password'); // Add this line
    let meter = document.getElementById('password-strength-meter');
    if (!meter) {
        meter = document.createElement('div');
        meter.id = 'password-strength-meter';
        meter.style.height = '5px';
        meter.style.marginTop = '5px';
        meter.style.borderRadius = '2px';
        meter.style.transition = 'all 0.3s ease';
        if (newPasswordInput) { // Add null check
            newPasswordInput.parentNode.appendChild(meter);
        }
    }
    
    // Set meter color and width based on strength
    let color, width;
    if (strength <= 1) {
        color = '#ff4444';
        width = '25%';
    } else if (strength <= 3) {
        color = '#ffbb33';
        width = strength === 2 ? '50%' : '75%';
    } else {
        color = '#00C851';
        width = '100%';
    }
    
    meter.style.backgroundColor = color;
    meter.style.width = width;
}

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