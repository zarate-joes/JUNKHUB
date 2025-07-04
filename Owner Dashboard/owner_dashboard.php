<?php
session_start();

if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="<?= $_SESSION['csrf_token'] ?>">
  <title>Owner Dashboard | JunkHUB</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="owner_dashboard.css">
  <link rel="icon" type="image/pnglogo" href="../Images/teallogo22619-foad-200h.png">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <!-- Add this inside your <body> tag, before the dashboard-container -->
    <header class="main-header">
        <div class="header-content">
            <div class="notification-icon">
              <i class="fas fa-bell"></i>
              <span class="notification-badge">3</span>
            </div>
            <div class="user-profile" data-tab="settings">
              <img src="../Dashboard/pngs/prof.png" alt="User Profile">
              <span class="username">John Doe</span>
            </div>
        </div>
        <div class="header-divider"></div>
    </header>

  <div class="dashboard-container">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <a href="../Landing Page/index.php" class="brand-link">
      <div class="logo-container">
        <img src="https://c.animaapp.com/i1oP7wZ8/img/teallogo-1@2x.png" alt="JunkHUB Logo" class="logo">
        <h1 class="logo-text"><span class="logo-highlight">Junk</span>HUB</h1>
      </div>
      </a>
      
      <nav class="main-nav">
        <ul>
          <li class="nav-item active" data-tab="overview">
            <i class="fas fa-chart-pie"></i>
            <span>Overview</span>
          </li>
          <li class="nav-item" data-tab="products">
            <i class="fas fa-box-open"></i>
            <span>My Products</span>
          </li>
          <li class="nav-item" data-tab="orders">
            <i class="fas fa-tasks"></i>
            <span>Order Management</span>
          </li>
          <li class="nav-item" data-tab="messages">
            <i class="fas fa-comment-alt"></i>
            <span>Messages & Feedback</span>
          </li>
          <li class="nav-item" data-tab="analytics">
            <i class="fas fa-chart-line"></i>
            <span>Analytics Reports</span>
          </li>
          <li class="nav-item" data-tab="settings">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      
      
      <div class="logout-container" id="logout-btn">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Overview Tab Content -->
      <div class="tab-content active" id="overview">
        <!-- Header -->
        <header class="dashboard-header">
          <div class="header-title">
            <h2>Overview</h2>
            <p>Welcome back! Here's what's happening with your business today.</p>
          </div>
    
        </header>

        <!-- Stats Cards -->
        <section class="stats-section">
          <div class="stats-card">
            <div class="stats-icon sales">
              <i class="fas fa-money-bill-wave"></i>
            </div>
            <div class="stats-info">
              <h3>Total Sales</h3>
              <p class="stats-value">₱12,450.00</p>
              <p class="stats-change positive">+12% from last week</p>
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-icon products">
              <i class="fas fa-boxes"></i>
            </div>
            <div class="stats-info">
              <h3>Active Products</h3>
              <p class="stats-value">8</p>
              <p class="stats-change neutral">Same as last week</p>
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-icon orders">
              <i class="fas fa-clipboard-list"></i>
            </div>
            <div class="stats-info">
              <h3>Pending Orders</h3>
              <p class="stats-value">5</p>
              <p class="stats-change negative">-2 from yesterday</p>
            </div>
          </div>
        </section>

        <!-- Products Section -->
        <section class="products-section">
          <div class="section-header">
            <h2>My Products Overview</h2>
            <div class="section-actions">

              <div class="view-toggle">
                <button class="toggle-btn active">For Sale</button>
                <button class="toggle-btn">For Bought</button>
              </div>
            </div>
          </div>
          
          <div class="products-grid">
            <!-- Product Card 1 -->
            <div class="product-card">
              <div class="product-icon">P</div>
              <div class="product-info">
                <h3>Plastic Bottles</h3>
                <p class="product-price">₱3/kg</p>
                <p class="product-stock">In stock: 20kg</p>
                <p class="product-category">Category: Plastic</p>
              </div>
            </div>
            
            <!-- Product Card 2 -->
            <div class="product-card">
              <div class="product-icon">S</div>
              <div class="product-info">
                <h3>Scrap Metal</h3>
                <p class="product-price">₱10/kg</p>
                <p class="product-stock">In stock: 8kg</p>
                <p class="product-category">Category: Metal</p>

              </div>
            </div>
            
            <!-- Product Card 3 -->
            <div class="product-card">
              <div class="product-icon">C</div>
              <div class="product-info">
                <h3>Cardboard</h3>
                <p class="product-price">₱5/kg</p>
                <p class="product-stock">In stock: 15kg</p>
                <p class="product-category">Category: Paper</p>

              </div>
            </div>
          </div>
        </section>

        <!-- Orders Section -->
<section class="orders-section">
  <div class="section-header">
    <h2>Recent Orders</h2>

  </div>
  
  <div class="orders-table">
    <div class="table-header">
      <div>Order #</div>
      <div>Buyer</div>
      <div>Items</div>
      <div>Date</div>
      <div>Status</div>
      <div>Action</div>
    </div>
    
    <div class="table-row">
      <div>#1234</div>
      <div>Chidrick</div>
      <div>Cardboard (10kg)</div>
      <div>March 20, 2025</div>
      <div><span class="status-badge pending">Pending</span></div>
      <div><button class="btn btn-sm">View</button></div>
    </div>
    
    <div class="table-row">
      <div>#1235</div>
      <div>Joebert</div>
      <div>Scrap Metal (2kg)</div>
      <div>March 21, 2025</div>
      <div><span class="status-badge completed">Completed</span></div>
      <div><button class="btn btn-sm">View</button></div>
    </div>
    
    <div class="table-row">
      <div>#1236</div>
      <div>Reggie</div>
      <div>Plastic Bottles (5kg)</div>
      <div>March 22, 2025</div>
      <div><span class="status-badge pending">Pending</span></div>
      <div><button class="btn btn-sm">View</button></div>
    </div>
  </div>
</section>

        <!-- Messages & Analytics Section -->
        <section class="bottom-section">
          <div class="messages-container">
            <div class="section-header">
              <h2>Recent Messages</h2>
              <button class="btn btn-text" data-tab="messages">View All</button>
            </div>
            
            <div class="message-card">
              <div class="message-header">
                <h3>Price Inquiry</h3>
                <span class="message-time">2 hours ago</span>
              </div>
              <p class="message-preview">Hi! I'm interested in your plastic bottles. What's the minimum quantity you sell?</p>
              <div class="message-footer">
                <span>From: John Doe</span>
              </div>
            </div>
            
            <div class="message-card">
              <div class="message-header">
                <h3>Feedback</h3>
                <span class="message-time">1 day ago</span>
              </div>
              <p class="message-preview">Nice! The materials were exactly as described. Will order again.</p>
              <div class="message-footer">
                <span>From: Sarah Smith</span>
              </div>
            </div>
          </div>
          
          <div class="analytics-container">
            <div class="section-header">
              <h2>Sales Analytics</h2>
              <div class="time-filter">
                <button class="filter-btn active">7D</button>
                <button class="filter-btn">30D</button>
                <button class="filter-btn">90D</button>
              </div>
            </div>
            
            <div class="chart-container">
              <div class="sales-chart">
                <canvas id="overviewChart"></canvas>
              </div>
              
              <div class="top-materials">
                <h3>Top Selling Materials</h3>
                <div class="materials-list">
                  <div class="material-item">
                    <span class="material-name">Plastic Bottles</span>
                    <span class="material-percent">45%</span>
                    <div class="progress-bar" style="width: 45%"></div>
                  </div>
                  <div class="material-item">
                    <span class="material-name">Scrap Metal</span>
                    <span class="material-percent">30%</span>
                    <div class="progress-bar" style="width: 30%"></div>
                  </div>
                  <div class="material-item">
                    <span class="material-name">Electronic Waste</span>
                    <span class="material-percent">25%</span>
                    <div class="progress-bar" style="width: 25%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Products Tab Content -->
      <div class="tab-content" id="products">
        <header class="dashboard-header">
          <div class="header-title">
            <h2>My Products</h2>
            <p>Manage your products and inventory</p>
          </div>
        </header>

<!-- Products Management Section -->
<section class="products-management">
  <div class="section-header">
    <h2>Product Inventory</h2>
    <div class="section-actions">
      <button class="btn btn-primary" id="add-product">
        <i class="fas fa-plus"></i> Add New Product
      </button>
      <div class="search-box">
        <input type="text" placeholder="Search products...">
        <i class="fas fa-search"></i>
      </div>
    </div>
  </div>

  <div class="category-filter">
    <button class="filter-btn active">All</button>
    <button class="filter-btn">Plastic</button>
    <button class="filter-btn">Metal</button>
    <button class="filter-btn">Glass</button>
    <button class="filter-btn">Paper</button>
  </div>

  <div class="products-table">
    <div class="table-header">
      <div>Image</div>
      <div>Product</div>
      <div>Price</div>
      <div>Stock</div>
      <div>Category</div>
      <div>Category 2</div>
      <div>Status</div>
      <div>Actions</div>
    </div>
    
    <div class="table-row">
      <div class="product-cell">
        <div class="product-icon">P</div>
        <div class="product-info">
          <h3>Plastic Bottles</h3>
          <p>ID: PB001</p>
        </div>
      </div>
      <div>₱3/kg</div>
      <div>
        <input type="number" value="20" min="0" class="stock-input">
        <span>kg</span>
      </div>
      <div>Plastic</div>
      <div>
        <label class="toggle-switch">
          <input type="checkbox" checked>
          <span class="slider"></span>
        </label>
        <span class="status-text">Available</span>
      </div>
      <div class="actions-cell">
        <button class="btn btn-edit"><i class="fas fa-edit"></i></button>
        <button class="btn btn-remove"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    
    <div class="table-row">
      <div class="product-cell">
        <div class="product-icon">S</div>
        <div class="product-info">
          <h3>Scrap Metal</h3>
          <p>ID: SM002</p>
        </div>
      </div>
      <div>₱10/kg</div>
      <div>
        <input type="number" value="8" min="0" class="stock-input">
        <span>kg</span>
      </div>
      <div>Metal</div>
      <div>
        <label class="toggle-switch">
          <input type="checkbox" checked>
          <span class="slider"></span>
        </label>
        <span class="status-text">Available</span>
      </div>
      <div class="actions-cell">
        <button class="btn btn-edit"><i class="fas fa-edit"></i></button>
        <button class="btn btn-remove"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    
    <div class="table-row">
      <div class="product-cell">
        <div class="product-icon">C</div>
        <div class="product-info">
          <h3>Cardboard</h3>
          <p>ID: CB003</p>
        </div>
      </div>
      <div>₱5/kg</div>
      <div>
        <input type="number" value="15" min="0" class="stock-input">
        <span>kg</span>
      </div>
      <div>Paper</div>
      <div>
        <label class="toggle-switch">
          <input type="checkbox" checked>
          <span class="slider"></span>
        </label>
        <span class="status-text">Available</span>
      </div>
      <div class="actions-cell">
        <button class="btn btn-edit"><i class="fas fa-edit"></i></button>
        <button class="btn btn-remove"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  </div>
</section>

          <!-- Add Product Modal -->
          <div class="modal" id="add-product-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Add New Product</h3>
                <button class="close-modal">&times;</button>
              </div>
              <div class="modal-body">
                <form id="product-form">
                  <div class="form-group">
                    <label for="product-name">Product Name</label>
                    <input type="text" id="product-name" required>
                  </div>
                  <div class="form-group">
                    <label for="product-category">Category</label>
                    <input list="category-options" id="product-category" required placeholder="Type or select category">
                    <datalist id="category-options">
                      <option value="Plastic">
                      <option value="Metal">
                      <option value="Glass">
                      <option value="Paper">
                      <option value="Other">
                    </datalist>
                  </div>
                  <div class="form-group">
                    <label for="product-category2">Category 2</label>
                    <select id="product-category2" required>
                      <option value="For Sale">For Sale</option>
                      <option value="For Bought">For Bought</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="product-price">Price (₱)</label>
                    <input type="number" id="product-price" min="0" step="0.01" required>
                  </div>
                  <div class="form-group">
                    <label for="product-stock">Initial Stock</label>
                    <input type="number" id="product-stock" min="0" required>
                  </div>
                  <div class="form-group">
                    <label for="product-unit">Unit</label>
                    <select id="product-unit" required>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="lb">lb</option>
                      <option value="piece">piece</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="product-description">Description (Optional)</label>
                    <textarea id="product-description" rows="3"></textarea>
                  </div>
                  <div class="form-group">
                      <label>Status</label>
                      <div class="toggle-container">
                          <label class="toggle-switch">
                              <input type="checkbox" id="product-status" checked>
                              <span class="slider"></span>
                          </label>
                          <span class="status-text">Active</span>
                      </div>
                  </div>
                  <div class="form-group">
                    <label for="product-image">Product Image</label>
                    <input type="file" id="product-image" accept="image/*">
                    <div class="image-preview" id="product-image-preview" style="margin-top: 10px; display: none;">
                      <img id="product-preview-img" src="#" alt="Product Preview" style="max-width: 200px; max-height: 200px;">
                    </div>
                  </div>
                  <div class="form-actions">
                    <button type="button" class="btn btn-cancel close-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Product</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Orders Tab Content -->
      <div class="tab-content" id="orders">
        <header class="dashboard-header">
          <div class="header-title">
            <h2>Order Management</h2>
            <p>View and manage customer orders</p>
          </div>
        </header>

        <section class="orders-management">
          <!-- Order Summary Cards -->
          <div class="order-summary">
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-clipboard-list"></i>
              </div>
              <div class="summary-info">
                <h3>Total Orders</h3>
                <p class="summary-value">24</p>
                <p class="summary-change positive">+8% from last week</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="summary-info">
                <h3>Completed</h3>
                <p class="summary-value">15</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="summary-info">
                <h3>Pending</h3>
                <p class="summary-value">5</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-times-circle"></i>
              </div>
              <div class="summary-info">
                <h3>Cancelled</h3>
                <p class="summary-value">4</p>
              </div>
            </div>
          </div>

          <!-- Order Filters and Search -->
          <div class="section-header">
            <h2>Order List</h2>
            <div class="section-actions">
              <div class="search-box">
                <input type="text" placeholder="Search orders...">
                <i class="fas fa-search"></i>
              </div>
              <div class="order-filter">
                <button class="filter-btn active">All</button>
                <button class="filter-btn">New</button>
                <button class="filter-btn">Accepted</button>
                <button class="filter-btn">Completed</button>
                <button class="filter-btn">Cancelled</button>
              </div>
            </div>
          </div>

          <div class="orders-table">
            <div class="table-header">
              <div>Order #</div>
              <div>Customer</div>
              <div>Date</div>
              <div>Items</div>
              <div>Total</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            
            <!-- Order Row 1 -->
            <div class="table-row">
              <div>#1234</div>
              <div>
                <div class="user-profile">
                  <img src="../Dashboard/pngs/prof.png" alt="User" width="30">
                  <span>Chidrick</span>
                </div>
              </div>
              <div>Mar 20, 2025</div>
              <div>3 items</div>
              <div>₱350.00</div>
              <div>
                <select class="status-select">
                  <option value="new">New</option>
                  <option value="accepted" selected>Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div class="order-actions">
                <button class="btn btn-sm btn-remove">Cancel</button>
              </div>
            </div>
            
            <!-- Order Row 2 -->
            <div class="table-row">
              <div>#1235</div>
              <div>
                <div class="user-profile">
                  <img src="../Dashboard/pngs/prof.png" alt="User" width="30">
                  <span>Joebert</span>
                </div>
              </div>
              <div>Mar 21, 2025</div>
              <div>2 items</div>
              <div>₱220.00</div>
              <div>
                <select class="status-select">
                  <option value="new">New</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed" selected>Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div class="order-actions">
                <button class="btn btn-sm" disabled>Cancel</button>
              </div>
            </div>
            
            <!-- Order Row 3 -->
            <div class="table-row">
              <div>#1236</div>
              <div>
                <div class="user-profile">
                  <img src="../Dashboard/pngs/prof.png" alt="User" width="30">
                  <span>Reggie</span>
                </div>
              </div>
              <div>Mar 22, 2025</div>
              <div>1 item</div>
              <div>₱150.00</div>
              <div>
                <select class="status-select">
                  <option value="new" selected>New</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div class="order-actions">
                <button class="btn btn-sm btn-remove">Cancel</button>
              </div>
            </div>
          </div>

        <!-- Order Details Modal -->
        <div class="modal order-details-modal" id="order-details-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Order Details #1234</h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
              <div class="order-info">
                <div class="form-group">
                  <label>Customer:</label>
                  <p>Chidrick</p>
                </div>
                <div class="form-group">
                  <label>Order Date:</label>
                  <p>March 20, 2025 at 10:30 AM</p>
                </div>
                <div class="form-group">
                  <label>Status:</label>
                  <div class="order-status-info">
                    <select class="status-select">
                      <option value="new">New</option>
                      <option value="accepted" selected>Accepted</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <span class="status-badge accepted">Accepted</span>
                  </div>
                </div>
              </div>

              <h4>Order Items</h4>
              <div class="order-items-list">
                <div class="order-item">
                  <div>
                    <strong>Plastic Bottles</strong>
                    <p>5kg × ₱3.00</p>
                  </div>
                  <div>₱15.00</div>
                </div>
                <div class="order-item">
                  <div>
                    <strong>Scrap Metal</strong>
                    <p>2kg × ₱10.00</p>
                  </div>
                  <div>₱20.00</div>
                </div>
                <div class="order-item">
                  <div>
                    <strong>Cardboard</strong>
                    <p>10kg × ₱5.00</p>
                  </div>
                  <div>₱50.00</div>
                </div>
              </div>

              <div class="order-total">
                <p>Subtotal: ₱85.00</p>
                <p>Service Fee: ₱5.00</p>
                <p>Total: ₱90.00</p>
              </div>

              <div class="order-history">
                <h4>Order History</h4>
                <div class="history-item">
                  <div>
                    <strong>Order placed</strong>
                    <p class="history-date">Mar 20, 2025 10:30 AM</p>
                  </div>
                  <span class="status-badge new">New</span>
                </div>
                <div class="history-item">
                  <div>
                    <strong>Order accepted</strong>
                    <p class="history-date">Mar 20, 2025 11:45 AM</p>
                  </div>
                  <span class="status-badge accepted">Accepted</span>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-cancel close-modal">Close</button>
                <button type="button" class="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages Tab Content -->
      <div class="tab-content" id="messages">
        <header class="dashboard-header">
          <div class="header-title">
            <h2>Messages</h2>
            <p>Communicate with your customers</p>
          </div>
        </header>

        <section class="messages-management">

          <div class="messages-list" id="messages-container">
            <!-- Messages will be loaded here dynamically -->
          </div>

          <!-- Reply Modal -->
          <div class="modal" id="reply-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Reply to Message</h3>
                <button class="close-modal">&times;</button>
              </div>
              <div class="modal-body">
                <form id="reply-form">
                  <div class="form-group">
                    <label>To: <span id="reply-to">John Doe</span></label>
                  </div>
                  <div class="form-group">
                    <label>Subject: <span id="reply-subject">Price Inquiry</span></label>
                  </div>
                  <div class="form-group">
                    <label for="reply-message">Your Message</label>
                    <textarea id="reply-message" rows="5" required></textarea>
                  </div>
                  <div class="form-actions">
                    <button type="button" class="btn btn-cancel close-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Send Reply</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Analytics Tab Content -->
      <div class="tab-content" id="analytics">
        <header class="dashboard-header">
          <div class="header-title">
            <h2>Analytics Reports</h2>
            <p>Track your business performance</p>
          </div>
          <div class="time-filter">
            <button class="filter-btn active">This Month</button>
            <button class="filter-btn">Last Month</button>
            <button class="filter-btn">Last 3 Months</button>
            <button class="filter-btn">Custom Range</button>
          </div>
        </header>

        <section class="analytics-reports">
          <div class="analytics-summary">
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <div class="summary-info">
                <h3>Total Sales</h3>
                <p class="summary-value">₱24,850.00</p>
                <p class="summary-change positive">+15% from last month</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div class="summary-info">
                <h3>Total Orders</h3>
                <p class="summary-value">42</p>
                <p class="summary-change positive">+8% from last month</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-box-open"></i>
              </div>
              <div class="summary-info">
                <h3>Products Sold</h3>
                <p class="summary-value">128</p>
                <p class="summary-change positive">+12% from last month</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="summary-info">
                <h3>New Customers</h3>
                <p class="summary-value">18</p>
                <p class="summary-change negative">-2 from last month</p>
              </div>
            </div>
          </div>

          <div class="analytics-charts">
            <div class="chart-card">
              <div class="chart-header">
                <h3>Sales Performance</h3>
                <div class="chart-filter">
                  <button class="filter-btn active">Daily</button>
                  <button class="filter-btn">Weekly</button>
                  <button class="filter-btn">Monthly</button>
                </div>
              </div>
              <div class="chart-container">
                <canvas id="salesChart"></canvas>
              </div>
            </div>
            
            <div class="chart-card">
              <div class="chart-header">
                <h3>Top Selling Products</h3>
              </div>
              <div class="chart-container">
                <canvas id="productsChart"></canvas>
              </div>
            </div>
          </div>

          <div class="monthly-sales">
            <div class="section-header">
              <h3>Monthly Sales Summary</h3>
              <button class="btn btn-text">Export as CSV</button>
            </div>
            <div class="sales-table">
              <div class="table-header">
                <div>Month</div>
                <div>Total Sales</div>
                <div>Orders</div>
                <div>Avg. Order Value</div>
                <div>New Customers</div>
              </div>
              
              <div class="table-row">
                <div>March 2025</div>
                <div>₱12,450.00</div>
                <div>24</div>
                <div>₱518.75</div>
                <div>8</div>
              </div>
              
              <div class="table-row">
                <div>February 2025</div>
                <div>₱10,850.00</div>
                <div>22</div>
                <div>₱493.18</div>
                <div>10</div>
              </div>
              
              <div class="table-row">
                <div>January 2025</div>
                <div>₱9,750.00</div>
                <div>18</div>
                <div>₱541.67</div>
                <div>6</div>
              </div>
              
              <div class="table-row">
                <div>December 2024</div>
                <div>₱8,200.00</div>
                <div>15</div>
                <div>₱546.67</div>
                <div>4</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Settings Tab Content -->
      <div class="tab-content" id="settings">
        <header class="dashboard-header">
          <div class="header-title">
            <h2>Settings</h2>
            <p>Manage your account and preferences</p>
          </div>
        </header>

        <section class="settings-management">
          <div class="settings-tabs">
            <button class="tab-btn active" data-tab="account">Account</button>
            <button class="tab-btn" data-tab="security">Security</button>
          </div>

          <div class="settings-content">
            <div class="tab-pane active" id="account-settings">
              <h3>Account Information</h3>
              <form class="settings-form">
                <div class="form-group">
                  <label for="account-name">Full Name</label>
                  <input type="text" id="account-name" value="" placeholder="John Doe">
                </div>
                <div class="form-group">
                  <label for="account-email">Email</label>
                  <input type="email" id="account-email" value="" placeholder="john.doe@example.com">
                </div>
                <div class="form-group">
                  <label for="account-phone">Phone Number</label>
                  <input type="tel" id="account-phone" value="" placeholder="j+639123456789">
                </div>
                <div class="form-group">
                  <label for="account-business">Shop Name</label>
                  <input type="text" id="account-business" value="" placeholder="JunkHUB">
                </div>
                <div class="form-group">
                  <label for="account-address">Shop Address</label>
                  <textarea id="account-address" placeholder="123 Main Street, Manila, Philippines"></textarea>
                </div>

                <div class="form-group">
                  <label for="shop-description">Shop Description</label>
                  <textarea id="shop-description" rows="4" placeholder="Tell customers about your shop"></textarea>
                </div>

                <div class="form-group">
                    <label for="account-barangay">Barangay</label>
                    <input type="text" id="account-barangay" value="" placeholder="Enter your barangay" required>
                </div>

                <div class="form-group">
                  <label for="shop-logo">Shop Logo</label>
                  <div class="logo-upload-container">
                    <div class="logo-preview">
                      <img id="logo-preview" src="../Dashboard/pngs/prof.png" alt="Current Logo" width="100">
                    </div>
                    <input type="file" id="shop-logo" accept="image/*" style="display: none;">
                    <button type="button" class="btn btn-primary" onclick="document.getElementById('shop-logo').click()">
                      <i class="fas fa-upload"></i> Upload New Logo
                    </button>
                  </div>
                </div>

                <!-- Add materials section if needed -->
                <div class="form-group">
                    <label>Accepted Materials</label>
                    <div class="materials-grid">
                        <!-- This will be populated by JavaScript -->
                    </div>
                </div>

                <div class="form-group">
                    <label>Business Hours</label>
                    <div class="business-hours">
                        <div class="day-hours">
                            <label>Monday - Friday</label>
                            <div class="time-inputs">
                                <input type="time" id="weekday-open" value="08:00">
                                <span>to</span>
                                <input type="time" id="weekday-close" value="17:00">
                            </div>
                        </div>
                        <div class="day-hours">
                            <label>Saturday</label>
                            <div class="time-inputs">
                                <input type="time" id="saturday-open" value="09:00">
                                <span>to</span>
                                <input type="time" id="saturday-close" value="15:00">
                            </div>
                        </div>
                        <div class="day-hours">
                            <label>Sunday</label>
                            <div class="time-inputs">
                                <input type="time" id="sunday-open" value="09:00" disabled>
                                <span>to</span>
                                <input type="time" id="sunday-close" value="12:00" disabled>
                                <label class="closed-checkbox">
                                    <input type="checkbox" id="sunday-closed" checked> Closed
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                  <button type="button" class="btn btn-cancel">Cancel</button>
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>

              </form>
            </div>

            <div class="tab-pane" id="security-settings">
              <h3>Security Settings</h3>
              <form class="settings-form">
                <div class="form-group">
                  <label for="current-password">Current Password</label>
                  <input type="password" id="current-password" class="password-input" placeholder="Enter current password">
                </div>
                <div class="form-group">
                  <label for="new-password">New Password</label>
                  <input type="password" id="new-password" class="password-input" placeholder="Enter new password">
                  <div class="password-strength">
                    <span class="strength-bar weak"></span>
                    <span class="strength-bar medium"></span>
                    <span class="strength-bar strong"></span>
                    <span class="strength-text">Weak</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="confirm-password">Confirm New Password</label>
                  <input type="password" id="confirm-password" class="password-input" placeholder="Confirm new password">
                </div>
                <div class="form-actions">
                  <button type="button" class="btn btn-cancel">Cancel</button>
                  <button type="submit" class="btn btn-primary">Update Security Settings</button>
                </div>
              </form>
            </div>

          </div>
        </section>
      </div>
    </main>
  </div>
  <script src="owner_dashboard.js"></script>
</body>
</html>