document.addEventListener('DOMContentLoaded', function () {
  // Menu item activation
  const menuItems = document.querySelectorAll('.menu-item');
  const mainContent = document.querySelector('.main-content');
  
  // Sign out modal elements
  const signoutModal = document.querySelector('.signout-modal');
  const signoutConfirmBtn = document.querySelector('.signout-confirm-btn');
  const signoutCancelBtn = document.querySelector('.signout-cancel-btn');
  
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Handle sign out separately
      if (this.classList.contains('sign-out')) {
        signoutModal.style.display = 'flex';
        return;
      }
      
      menuItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      
      // Clear existing content
      mainContent.innerHTML = '';
      
      // Load the appropriate content for each menu item
      switch(this.querySelector('span').textContent) {
        case 'Dashboard':
          loadDashboardContent();
          break;
        case 'Analytics':
          loadAnalyticsContent();
          break;
        case 'Monitor Orders':
          loadOrdersContent();
          break;
        case 'Generate Reports':
          loadReportsContent();
          break;
        case 'Manage Users':
          loadUsersContent();
          break;
        case 'Review Owner Accounts':
          loadReviewOwnersContent();
          break;
      }
    });
  });
  
  // Enhanced Sign out confirmation button
  signoutConfirmBtn.addEventListener('click', function() {
    // Show loading state
    const originalText = signoutConfirmBtn.innerHTML;
    signoutConfirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing Out...';
    signoutConfirmBtn.disabled = true;
    
    // Perform logout via AJAX
    fetch('../Backend/logout.php')
      .then(response => {
        if (response.ok) {
          // Redirect to login page after successful logout
          window.location.href = '../Landing Page/index.php';
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Logout error:', error);
        signoutConfirmBtn.innerHTML = originalText;
        signoutConfirmBtn.disabled = false;
        alert('Logout failed. Please try again.');
      });
  });
  
  // Sign out cancel button
  signoutCancelBtn.addEventListener('click', function() {
    signoutModal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  signoutModal.addEventListener('click', function(e) {
    if (e.target === signoutModal) {
      signoutModal.style.display = 'none';
    }
  });

  // Initial load
  loadDashboardContent();












  

  function loadDashboardContent() {
    // Your existing dashboard content
    mainContent.innerHTML = `
      <div class="content-header">
        <h2>Admin Dashboard</h2>
        <div class="breadcrumb">Home / Dashboard</div>
      </div>
      
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon" style="background-color: #4e73df;">
            <i class="fas fa-calendar"></i>
          </div>
          <div class="stat-info">
            <div class="stat-title">Total Orders</div>
            <div class="stat-value">1,248</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background-color: #1cc88a;">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="stat-info">
            <div class="stat-title">Revenue</div>
            <div class="stat-value">$48,352</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background-color: #36b9cc;">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-info">
            <div class="stat-title">Users</div>
            <div class="stat-value">1,024</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background-color: #f6c23e;">
            <i class="fas fa-percentage"></i>
          </div>
          <div class="stat-info">
            <div class="stat-title">Conversion</div>
            <div class="stat-value">24%</div>
          </div>
        </div>
      </div>
      
      <div class="charts-container">
        <div class="chart-card">
          <h3>Sales Overview</h3>
          <canvas id="salesChart"></canvas>
        </div>
        <div class="chart-card">
          <h3>User Activity</h3>
          <canvas id="activityChart"></canvas>
        </div>
      </div>
      
      <div class="recent-orders">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#JH-1001</td>
              <td>John Doe</td>
              <td>3</td>
              <td>$124.00</td>
              <td><span class="status shipped">Shipped</span></td>
              <td><button class="action-btn">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    
    // Initialize dashboard charts
    initDashboardCharts();
  }

 function loadAnalyticsContent() {
  mainContent.innerHTML = `
    <div class="content-header">
      <h2>Analytics Dashboard</h2>
      <div class="breadcrumb">Home / Analytics</div>
    </div>
    
    <div class="metrics-rectangle" style="
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 0 15px rgba(0,0,0,0.05);
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
      <div class="metric-item" style="
        flex: 1;
        text-align: center;
        padding: 15px;
        border-right: 1px solid #e0e0e0;
      ">
        <h3 style="color: #6c757d; font-size: 16px; margin-bottom: 10px;">Total Page Views</h3>
        <div style="color: #293840; font-size: 28px; font-weight: 700;">28,740</div>
      </div>
      
      <div class="metric-item" style="
        flex: 1;
        text-align: center;
        padding: 15px;
        border-right: 1px solid #e0e0e0;
      ">
        <h3 style="color: #6c757d; font-size: 16px; margin-bottom: 10px;">Conversion Rate</h3>
        <div style="color: #293840; font-size: 28px; font-weight: 700;">3.9%</div>
      </div>
      
      <div class="metric-item" style="
        flex: 1;
        text-align: center;
        padding: 15px;
      ">
        <h3 style="color: #6c757d; font-size: 16px; margin-bottom: 10px;">Avg. Session Duration</h3>
        <div style="color: #293840; font-size: 28px; font-weight: 700;">2m 34s</div>
      </div>
    </div>
    
    <div class="analytics-filters">
      <div class="filter-option">
        <input type="checkbox" id="togglePageViews" checked>
        <label for="togglePageViews">Page Views</label>
      </div>
      <div class="filter-option">
        <input type="checkbox" id="toggleProductSales" checked>
        <label for="toggleProductSales">Product Sales</label>
      </div>
      <div class="filter-option">
        <input type="checkbox" id="toggleOrders" checked>
        <label for="toggleOrders">Orders</label>
      </div>
      <div class="filter-option">
        <input type="checkbox" id="toggleUsers" checked>
        <label for="toggleUsers">Users</label>
      </div>
    </div>
    
    <div class="analytics-chart-container">
      <canvas id="analyticsChart"></canvas>
    </div>
  `;
  
  // Initialize analytics chart and store the chart instance
  const chart = initAnalyticsChart();
  
  // Add event listeners to the filter checkboxes
  document.getElementById('togglePageViews').addEventListener('change', function() {
    chart.data.datasets[0].hidden = !this.checked;
    chart.update();
  });
  
  document.getElementById('toggleProductSales').addEventListener('change', function() {
    chart.data.datasets[1].hidden = !this.checked;
    chart.update();
  });
  
  document.getElementById('toggleOrders').addEventListener('change', function() {
    chart.data.datasets[2].hidden = !this.checked;
    chart.update();
  });
  
  document.getElementById('toggleUsers').addEventListener('change', function() {
    chart.data.datasets[3].hidden = !this.checked;
    chart.update();
  });
}










  function initDashboardCharts() {
    // Your existing chart initialization code
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [12000, 19000, 15000, 22000, 20000, 25000],
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          borderColor: 'rgba(78, 115, 223, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(78, 115, 223, 1)',
          pointBorderColor: '#fff',
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
          pointHoverBorderColor: '#fff',
          pointHitRadius: 10,
          pointBorderWidth: 2,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });

    const activityCtx = document.getElementById('activityChart').getContext('2d');
    new Chart(activityCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Active Users',
          data: [542, 780, 650, 890, 1020, 750, 620],
          backgroundColor: 'rgba(28, 200, 138, 0.8)',
          borderColor: 'rgba(28, 200, 138, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
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

function initAnalyticsChart() {
  const ctx = document.getElementById('analyticsChart').getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Page Views',
          data: [4000, 5000, 6000, 7000, 8000, 9000, 10000],
          borderColor: 'rgba(78, 115, 223, 1)',
          backgroundColor: 'rgba(78, 115, 223, 0.1)',
          borderWidth: 2,
          fill: true,
          hidden: false
        },
        {
          label: 'Product Sales',
          data: [3000, 4000, 5000, 6000, 7000, 8000, 9000],
          borderColor: 'rgba(28, 200, 138, 1)',
          backgroundColor: 'rgba(28, 200, 138, 0.1)',
          borderWidth: 2,
          fill: true,
          hidden: false
        },
        {
          label: 'Orders',
          data: [2000, 3000, 4000, 5000, 6000, 7000, 8000],
          borderColor: 'rgba(54, 185, 204, 1)',
          backgroundColor: 'rgba(54, 185, 204, 0.1)',
          borderWidth: 2,
          fill: true,
          hidden: false
        },
        {
          label: 'Users',
          data: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
          borderColor: 'rgba(246, 194, 62, 1)',
          backgroundColor: 'rgba(246, 194, 62, 0.1)',
          borderWidth: 2,
          fill: true,
          hidden: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
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





  
function loadOrdersContent() {
  mainContent.innerHTML = `
    <div class="content-header">
      <h2>Order Monitoring</h2>
      <div class="breadcrumb">Home / Orders</div>
    </div>
    
    <div class="orders-filters">
      <div class="filter-group">
        <label for="order-status">Status:</label>
        <select id="order-status">
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="date-range">Date Range:</label>
        <select id="date-range">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month" selected>This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      
      <div class="filter-group">
        <button class="filter-btn"><i class="fas fa-filter"></i> Apply Filters</button>
        <button class="export-btn"><i class="fas fa-file-export"></i> Export</button>
      </div>
    </div>
    
    <div class="orders-summary">
      <div class="summary-card">
        <i class="fas fa-clock"></i>
        <div>
          <h3>Pending</h3>
          <p>24 Orders</p>
        </div>
      </div>
      <div class="summary-card">
        <i class="fas fa-cog"></i>
        <div>
          <h3>Processing</h3>
          <p>18 Orders</p>
        </div>
      </div>
      <div class="summary-card">
        <i class="fas fa-truck"></i>
        <div>
          <h3>Shipped</h3>
          <p>42 Orders</p>
        </div>
      </div>
      <div class="summary-card">
        <i class="fas fa-check-circle"></i>
        <div>
          <h3>Delivered</h3>
          <p>156 Orders</p>
        </div>
      </div>
    </div>
    
    <div class="orders-table-container">
      <div class="table-header">
        <h3>Recent Orders</h3>
        <div class="search-orders">
          <input type="text" placeholder="Search orders...">
          <i class="fas fa-search"></i>
        </div>
      </div>
      
      <table class="orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Michael Johnson</td>
            <td>2023-05-15</td>
            <td>$87.50</td>
            <td><span class="status pending">Pending</span></td>
            <td>
              <button class="action-btn view-btn" data-order="1042"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-order="1042"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-order="1042"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td>Sarah Williams</td>
            <td>2023-05-14</td>
            <td>$124.99</td>
            <td><span class="status processing">Processing</span></td>
            <td>
              <button class="action-btn view-btn" data-order="1041"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-order="1041"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-order="1041"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td>Robert Brown</td>
            <td>2023-05-13</td>
            <td>$56.75</td>
            <td><span class="status shipped">Shipped</span></td>
            <td>
              <button class="action-btn view-btn" data-order="1040"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-order="1040"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-order="1040"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td>Emily Davis</td>
            <td>2023-05-12</td>
            <td>$215.00</td>
            <td><span class="status delivered">Delivered</span></td>
            <td>
              <button class="action-btn view-btn" data-order="1039"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-order="1039"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-order="1039"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td>David Miller</td>
            <td>2023-05-11</td>
            <td>$42.99</td>
            <td><span class="status cancelled">Cancelled</span></td>
            <td>
              <button class="action-btn view-btn" data-order="1038"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-order="1038"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-order="1038"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination">
        <button class="page-btn disabled"><i class="fas fa-chevron-left"></i></button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  `;

  // Add event listeners for action buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order');
      viewOrder(orderId);
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order');
      editOrder(orderId);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order');
      deleteOrder(orderId);
    });
  });
}

// Order action functions
function viewOrder(orderId) {
  alert(`Viewing order #JH-${orderId}`);
  // In a real application, you would show a modal or redirect to an order detail page
}

function editOrder(orderId) {
  alert(`Editing order #JH-${orderId}`);
  // In a real application, you would show an edit form
}

function deleteOrder(orderId) {
  if (confirm(`Are you sure you want to delete order #JH-${orderId}?`)) {
    alert(`Order #JH-${orderId} deleted`);
    // In a real application, you would make an API call to delete the order
    // Then refresh the orders table
  }
}







function loadReportsContent() {
  mainContent.innerHTML = `
    <div class="content-header">
      <h2>Report Generation</h2>
      <div class="breadcrumb">Home / Generate Reports</div>
    </div>
    
    <div class="report-container" style="
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 0 15px rgba(0,0,0,0.05);
      margin-bottom: 30px;
    ">
      <h3 style="color: #293840; margin-bottom: 20px;">Date Range:</h3>
      
      <div style="display: flex; gap: 15px; margin-bottom: 30px;">
        <div style="flex: 1;">
          <input type="date" style="
            width: 100%;
            padding: 10px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
          ">
          <p style="text-align: center; margin-top: 5px; color: #6c757d;">dd/mm/yyyy</p>
        </div>
        
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          color: #6c757d;
          margin-top: 25px;
          
        ">
          to
        </div>
        
        <div style="flex: 1;">
          <input type="date" style="
            width: 100%;
            padding: 10px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
          ">
          <p style="text-align: center; margin-top: 5px; color: #6c757d;">dd/mm/yyyy</p>
        </div>
      </div>
      
      <button style="
        background-color: #293840;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 30px;
      ">
        Generate Report
      </button>
      
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">User</th>
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Material</th>
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Quantity</th>
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Weight (kg)</th>
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Points</th>
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Total Cash (P)</th>
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Juan Dela Cruz</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Plastic</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">3</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">4.5</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">45</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">₽45.00</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2025-05-10</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Maria Santos</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Metal</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">3.2</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">32</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">₽48.00</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2025-05-11</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Carlos Reyes</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Glass</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">1</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">20</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">₽16.00</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2025-05-13</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Juan Dela Cruz</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Glass</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2.5</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">25</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">₽20.00</td>
              <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2025-05-13</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 4px;
        margin-bottom: 30px;
      ">
        <div style="font-weight: 600; color: #293840;">GRAND TOTAL</div>
        <div style="display: flex; gap: 20px;">
          <div style="text-align: center;">
            <div style="font-size: 12px; color: #6c757d;">Quantity</div>
            <div style="font-weight: 600;">8</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 12px; color: #6c757d;">Weight (kg)</div>
            <div style="font-weight: 600;">12.20</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 12px; color: #6c757d;">Points</div>
            <div style="font-weight: 600;">122</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 12px; color: #6c757d;">Total Cash (P)</div>
            <div style="font-weight: 600;">₽129.00</div>
          </div>
        </div>
      </div>
      
      <div style="text-align: center;">
        <button style="
          background-color: #293840;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        ">
          <i class="fas fa-file-download"></i>
          Download CSV
        </button>
      </div>
    </div>
  `;

  // Add event listener for the generate report button
  document.querySelector('.report-container button').addEventListener('click', function() {
    alert('Generating report...');
    // In a real application, you would fetch data based on the selected date range
  });

  // Add event listener for the download CSV button
// Replace the existing event listener for the download CSV button with this:
document.querySelector('.report-container button:last-child').addEventListener('click', function() {
  // Get all the table data
  const table = document.querySelector('.report-container table');
  const rows = table.querySelectorAll('tr');
  
  // Prepare CSV content
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Add headers
  const headers = [];
  table.querySelectorAll('th').forEach(th => {
    headers.push('"' + th.textContent.trim().replace(/"/g, '""') + '"');
  });
  csvContent += headers.join(",") + "\r\n";
  
  // Add data rows
  rows.forEach((row, index) => {
    if (index === 0) return;
    
    const rowData = [];
    row.querySelectorAll('td').forEach(td => {
      let text = td.textContent.trim();
      if (text.startsWith('₽')) {
        text = text.replace('₽', '') + ' (PHP)';
      }
      rowData.push('"' + text.replace(/"/g, '""') + '"');
    });
    csvContent += rowData.join(",") + "\r\n";
  });
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `junkhub_report_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  
  // Trigger download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
});
}




















// In the loadUsersContent() function in Admin.js
function loadUsersContent() {
  mainContent.innerHTML = `
    <div class="content-header">
      <h2>Manage Users</h2>
      <div class="breadcrumb">Home / Manage Users</div>
    </div>
    
    <div class="users-filters">
      <div class="filter-group">
        <label for="user-role">Role:</label>
        <select id="user-role">
          <option value="all">All Users</option>
          <option value="owner">Owner</option>
          <option value="user">User</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="user-status">Status:</label>
        <select id="user-status">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
      
      <div class="search-users">
        <input type="text" id="user-search" placeholder="Search users...">
        <i class="fas fa-search"></i>
      </div>
      
      <button class="add-user-btn">
        <i class="fas fa-plus"></i>
        Add User
      </button>
    </div>
    
    <div class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="users-table-body">
          <tr><td colspan="6" class="loading">Loading users...</td></tr>
        </tbody>
      </table>
      
      <div class="pagination">
        <button class="page-btn disabled"><i class="fas fa-chevron-left"></i></button>
        <button class="page-btn active">1</button>
        <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
    
    <!-- Add User Modal -->
    <div class="modal" id="add-user-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New User</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <form id="add-user-form">
            <div class="form-row">
              <div class="form-group">
                <label for="user-type">User Type</label>
                <select id="user-type" name="user_type" required>
                  <option value="user">Regular User</option>
                  <option value="owner">Business Owner</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="status">Status</label>
                <select id="status" name="status" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" name="first_name" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" name="last_name" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required>
              </div>
            </div>
            
            <div class="form-group password-toggle">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required>
              <i class="fas fa-eye toggle-icon" id="toggle-password"></i>
              <div class="form-hint">Minimum 8 characters</div>
            </div>
            
            <!-- Owner-specific fields (hidden by default) -->
            <div id="owner-fields" style="display: none;">
              <div class="form-group">
                <label for="business-name">Business Name</label>
                <input type="text" id="business-name" name="business_name">
              </div>
              
              <div class="form-group">
                <label for="business-address">Business Address</label>
                <input type="text" id="business-address" name="business_address">
              </div>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="cancel-btn">Cancel</button>
              <button type="submit" class="submit-btn">
                <i class="fas fa-user-plus"></i>
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Edit User Modal -->
    <div class="modal" id="edit-user-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit User</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <form id="edit-user-form">
            <input type="hidden" id="edit-user-id" name="user_id">
            
            <div class="form-row">
              <div class="form-group">
                <label for="edit-user-type">User Type</label>
                <select id="edit-user-type" name="user_type" required>
                  <option value="user">Regular User</option>
                  <option value="owner">Business Owner</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="edit-status">Status</label>
                <select id="edit-status" name="status" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="edit-first-name">First Name</label>
                <input type="text" id="edit-first-name" name="first_name" required>
              </div>
              
              <div class="form-group">
                <label for="edit-last-name">Last Name</label>
                <input type="text" id="edit-last-name" name="last_name" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="edit-email">Email</label>
                <input type="email" id="edit-email" name="email" required>
              </div>
              
              <div class="form-group">
                <label for="edit-phone">Phone</label>
                <input type="tel" id="edit-phone" name="phone" required>
              </div>
            </div>
            
            <div class="form-group password-toggle">
              <label for="edit-password">New Password</label>
              <input type="password" id="edit-password" name="password" placeholder="Leave blank to keep current">
              <i class="fas fa-eye toggle-icon" id="edit-toggle-password"></i>
              <div class="form-hint">Minimum 8 characters</div>
            </div>
            
            <!-- Owner-specific fields (hidden by default) -->
            <div id="edit-owner-fields" style="display: none;">
              <div class="form-group">
                <label for="edit-business-name">Business Name</label>
                <input type="text" id="edit-business-name" name="business_name">
              </div>
              
              <div class="form-group">
                <label for="edit-business-address">Business Address</label>
                <input type="text" id="edit-business-address" name="business_address">
              </div>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="cancel-btn">Cancel</button>
              <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Load initial user data
  loadUsersData();

  // Set up event listeners
  document.getElementById('user-role').addEventListener('change', loadUsersData);
  document.getElementById('user-status').addEventListener('change', loadUsersData);
  document.getElementById('user-search').addEventListener('input', loadUsersData);
  
  // Add user modal functionality
  document.querySelector('.add-user-btn').addEventListener('click', () => {
    document.getElementById('add-user-modal').style.display = 'flex';
  });
  
  // Close modal buttons
  document.querySelectorAll('.close-modal, .cancel-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (e.target === this) {
        this.closest('.modal').style.display = 'none';
      }
    });
  });
  
  // Close modal when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
  });
  
  // Toggle owner fields based on user type
  document.getElementById('user-type').addEventListener('change', (e) => {
    document.getElementById('owner-fields').style.display = 
      e.target.value === 'owner' ? 'block' : 'none';
  });
  
  document.getElementById('edit-user-type').addEventListener('change', (e) => {
    document.getElementById('edit-owner-fields').style.display = 
      e.target.value === 'owner' ? 'block' : 'none';
  });
  
  // Password toggle functionality
  document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });
  
  document.getElementById('edit-toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('edit-password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });
  
  // Form submissions
  document.getElementById('add-user-form').addEventListener('submit', addNewUser);
  document.getElementById('edit-user-form').addEventListener('submit', updateUser);
}

// Enhanced editUser function
function editUser(userId) {
  // Show loading state in modal
  const modal = document.getElementById('edit-user-modal');
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>
      <p>Loading user data...</p>
    </div>
  `;
  modal.style.display = 'flex';
  
  // Store the original form HTML from the template
  const originalFormHTML = `
    <form id="edit-user-form">
      <input type="hidden" id="edit-user-id" name="user_id">
      
      <div class="form-row">
        <div class="form-group">
          <label for="edit-user-type">User Type</label>
          <select id="edit-user-type" name="user_type" required>
            <option value="user">Regular User</option>
            <option value="owner">Business Owner</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="edit-status">Status</label>
          <select id="edit-status" name="status" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="edit-first-name">First Name</label>
          <input type="text" id="edit-first-name" name="first_name" required>
        </div>
        
        <div class="form-group">
          <label for="edit-last-name">Last Name</label>
          <input type="text" id="edit-last-name" name="last_name" required>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="edit-email">Email</label>
          <input type="email" id="edit-email" name="email" required>
        </div>
        
        <div class="form-group">
          <label for="edit-phone">Phone</label>
          <input type="tel" id="edit-phone" name="phone" required>
        </div>
      </div>
      
      <div class="form-group password-toggle">
        <label for="edit-password">New Password</label>
        <input type="password" id="edit-password" name="password" placeholder="Leave blank to keep current">
        <i class="fas fa-eye toggle-icon" id="edit-toggle-password"></i>
        <div class="form-hint">Minimum 8 characters</div>
      </div>
      
      <!-- Owner-specific fields (hidden by default) -->
      <div id="edit-owner-fields" style="display: none;">
        <div class="form-group">
          <label for="edit-business-name">Business Name</label>
          <input type="text" id="edit-business-name" name="business_name">
        </div>
        
        <div class="form-group">
          <label for="edit-business-address">Business Address</label>
          <input type="text" id="edit-business-address" name="business_address">
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="cancel-btn">Cancel</button>
        <button type="submit" class="submit-btn">
          <i class="fas fa-save"></i>
          Save Changes
        </button>
      </div>
    </form>
  `;
  
  // Fetch user data
  fetch(`../Backend/get_users.php?id=${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(user => {
      if (user.error) {
        throw new Error(user.error);
      }
      
      // Populate the modal with the form
      modalBody.innerHTML = originalFormHTML;
      
      // Populate the edit form
      document.getElementById('edit-user-id').value = user.id;
      document.getElementById('edit-user-type').value = user.role;
      document.getElementById('edit-status').value = user.status;
      document.getElementById('edit-first-name').value = user.first_name;
      document.getElementById('edit-last-name').value = user.last_name;
      document.getElementById('edit-email').value = user.email;
      document.getElementById('edit-phone').value = user.phone;
      
      // Show owner fields if user is an owner
      const ownerFields = document.getElementById('edit-owner-fields');
      if (user.role === 'owner') {
        ownerFields.style.display = 'block';
        document.getElementById('edit-business-name').value = user.business_name || '';
        document.getElementById('edit-business-address').value = user.business_address || '';
      } else {
        ownerFields.style.display = 'none';
      }
      
      // Reattach event listeners
      document.getElementById('edit-user-form').addEventListener('submit', updateUser);
      document.getElementById('edit-user-type').addEventListener('change', (e) => {
        document.getElementById('edit-owner-fields').style.display = 
          e.target.value === 'owner' ? 'block' : 'none';
      });
      document.getElementById('edit-toggle-password').addEventListener('click', function() {
        const passwordInput = document.getElementById('edit-password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
      });
      modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.style.display = 'none';
      });
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      modalBody.innerHTML = `<div class="error-message">Failed to load user data: ${error.message}</div>`;
    });
}

// Update user function
function updateUser(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const userId = formData.get('user_id');
  
  // Show loading state
  const submitBtn = form.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  submitBtn.disabled = true;
  
  fetch('../Backend/update_user.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('User updated successfully!');
      document.getElementById('edit-user-modal').style.display = 'none';
      loadUsersData(); // Refresh the user list
    } else {
      alert(data.error || 'Failed to update user');
    }
  })
  .catch(error => {
    console.error('Error updating user:', error);
    alert('Failed to update user. Please try again.');
  })
  .finally(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

function loadUsersData() {
  const roleFilter = document.getElementById('user-role').value;
  const statusFilter = document.getElementById('user-status').value;
  const searchQuery = document.getElementById('user-search').value;
  
  fetch(`../Backend/get_users.php?role=${roleFilter}&status=${statusFilter}&search=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('users-table-body');
      tbody.innerHTML = '';
      
      if (data.error) {
        tbody.innerHTML = `<tr><td colspan="6" class="error">${data.error}</td></tr>`;
        return;
      }
      
      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="no-results">No users found</td></tr>`;
        return;
      }
      
      data.forEach(user => {
        const row = document.createElement('tr');
        
        // Determine role and status badges
        const roleBadge = user.role === 'owner' ? 
          '<span class="role-badge owner">Owner</span>' : 
          '<span class="role-badge user">User</span>';
          
        const statusBadge = `<span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>`;
        
        row.innerHTML = `
          <td>
            <div class="user-info">
              ${user.profile_image ? `<img src="../${user.profile_image}" alt="${user.first_name}">` : ''}
              <span>${user.first_name} ${user.last_name}</span>
            </div>
          </td>
          <td>${user.email}</td>
          <td>${roleBadge}</td>
          <td>${statusBadge}</td>
          <td>${new Date(user.created_at).toLocaleDateString()}</td>
          <td>
            <button class="action-btn edit-btn" data-user-id="${user.id}"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete-btn" data-user-id="${user.id}"><i class="fas fa-trash"></i></button>
          </td>
        `;
        
        tbody.appendChild(row);
      });
      
      // Add event listeners to action buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const userId = e.currentTarget.getAttribute('data-user-id');
          editUser(userId);
        });
      });
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const userId = e.target.closest('button').getAttribute('data-user-id');
          deleteUser(userId);
        });
      });
    })
    .catch(error => {
      console.error('Error loading users:', error);
      document.getElementById('users-table-body').innerHTML = 
        `<tr><td colspan="6" class="error">Failed to load users. Please try again.</td></tr>`;
    });
}

function addNewUser(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  fetch('../Backend/add_user.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('User added successfully!');
      form.reset();
      document.getElementById('add-user-modal').style.display = 'none';
      loadUsersData(); // Refresh the user list
    } else {
      alert(data.error || 'Failed to add user');
    }
  })
  .catch(error => {
    console.error('Error adding user:', error);
    alert('Failed to add user. Please try again.');
  });
}

function deleteUser(userId) {
  if (confirm(`Are you sure you want to delete this user?`)) {
    fetch(`../Backend/delete_user.php?id=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          loadUsersData(); // Refresh the user list
        } else {
          alert(data.error || 'Failed to delete user');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      });
  }
}


// For Review Owner Accounts tab ----------------
function loadReviewOwnersContent() {
  mainContent.innerHTML = `
    <div class="content-header">
      <h2>Review Owner Accounts</h2>
      <div class="breadcrumb">Home / Review Owner Accounts</div>
    </div>
    
    <div class="filter-controls">
      <select id="status-filter">
        <option value="pending">Show Pending</option>
        <option value="all">Show All</option>
        <option value="approved">Show Approved</option>
        <option value="rejected">Show Rejected</option>
      </select>
    </div>
    
    <div class="owners-list-container">
      <div class="owners-list-header">
        <div>Owner Name</div>
        <div>Business Name</div>
        <div>Email</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      <div class="owners-list" id="owners-list">
        <!-- Owner applications will be loaded here -->
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i> Loading owner applications...
        </div>
      </div>
    </div>
    
    <!-- Rejection Modal (hidden by default) -->
    <div class="rejection-modal" id="rejection-modal">
      <div class="rejection-modal-content">
        <h3>Reject Application</h3>
        <textarea id="rejection-reason" placeholder="Enter reason for rejection..."></textarea>
        <div class="modal-buttons">
          <button class="cancel-rejection">Cancel</button>
          <button class="confirm-rejection">Confirm Rejection</button>
        </div>
      </div>
    </div>
  `;

  // Load owner applications
  loadOwnerApplications();

  // Set up event listeners
  document.getElementById('status-filter').addEventListener('change', loadOwnerApplications);
  
  // Modal event listeners will be set up after loading data
}

function loadOwnerApplications() {
  const statusFilter = document.getElementById('status-filter').value;
  const ownersList = document.getElementById('owners-list');
  
  ownersList.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading owner applications...</div>';
  
  fetch(`../Backend/get_owner_applications.php?status=${statusFilter}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        ownersList.innerHTML = `<div class="error-message">${data.error}</div>`;
        return;
      }
      
      if (data.length === 0) {
        ownersList.innerHTML = '<div class="no-results">No owner applications found</div>';
        return;
      }
      
      ownersList.innerHTML = '';
      
      data.forEach(owner => {
        const ownerElement = document.createElement('div');
        ownerElement.className = 'owner-application';
        ownerElement.dataset.ownerId = owner.owner_id;
        
        let statusBadge = '';
        if (owner.status === 'pending') {
          statusBadge = '<span class="status-badge pending">Pending</span>';
        } else if (owner.status === 'approved') {
          statusBadge = '<span class="status-badge approved">Approved</span>';
        } else {
          statusBadge = '<span class="status-badge rejected">Rejected</span>';
        }
        
        ownerElement.innerHTML = `
          <div>${owner.first_name} ${owner.last_name}</div>
          <div>${owner.business_name || 'N/A'}</div>
          <div>${owner.email}</div>
          <div>${statusBadge}</div>
          <div class="action-buttons">
            ${owner.status === 'pending' ? 
              `<button class="accept-btn" data-owner-id="${owner.owner_id}">Accept</button>
               <button class="reject-btn" data-owner-id="${owner.owner_id}">Reject</button>` : 
              ''}
            <button class="view-btn" data-owner-id="${owner.owner_id}">View</button>
          </div>
        `;
        
        ownersList.appendChild(ownerElement);
      });
      
      // Set up event listeners for buttons
      document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const ownerId = this.getAttribute('data-owner-id');
          if (confirm(`Are you sure you want to approve this owner application?`)) {
            updateOwnerStatus(ownerId, 'approved');
          }
        });
      });
      
      document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const ownerId = this.getAttribute('data-owner-id');
          showRejectionModal(ownerId);
        });
      });
      
      document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const ownerId = this.getAttribute('data-owner-id');
          viewOwnerDetails(ownerId);
        });
      });
      
      // Set up modal buttons
      document.querySelector('.cancel-rejection')?.addEventListener('click', hideRejectionModal);
      document.querySelector('.confirm-rejection')?.addEventListener('click', confirmRejection);
    })
    .catch(error => {
      ownersList.innerHTML = `<div class="error-message">Failed to load owner applications: ${error.message}</div>`;
    });
}

function showRejectionModal(ownerId) {
  const modal = document.getElementById('rejection-modal');
  modal.dataset.ownerId = ownerId;
  modal.style.display = 'flex';
}

function hideRejectionModal() {
  document.getElementById('rejection-modal').style.display = 'none';
}

function confirmRejection() {
  const modal = document.getElementById('rejection-modal');
  const ownerId = modal.dataset.ownerId;
  const reason = document.getElementById('rejection-reason').value;
  
  if (!reason) {
    alert('Please provide a reason for rejection');
    return;
  }
  
  updateOwnerStatus(ownerId, 'rejected', reason);
  hideRejectionModal();
}

function updateOwnerStatus(ownerId, status, reason = '') {
  fetch('../Backend/update_owner_status.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      owner_id: ownerId,
      status: status,
      reason: reason
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      loadOwnerApplications();
    } else {
      alert(data.error || 'Failed to update owner status');
    }
  })
  .catch(error => {
    alert('Error updating owner status: ' + error.message);
  });
}

function viewOwnerDetails(ownerId) {
  // Fetch owner details
  fetch(`../Backend/get_owner_applications.php?status=all`)
    .then(response => response.json())
    .then(data => {
      const owner = data.find(o => o.owner_id == ownerId);
      if (!owner) {
        alert('Owner details not found');
        return;
      }
      
      // Create modal HTML
      const modalHTML = `
        <div class="owner-details-modal" id="owner-details-modal">
          <div class="owner-details-content">
            <div class="owner-details-header">
              <h3>Owner & Business Details</h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="owner-details-body">
              <div class="owner-section">
                <div class="section-title">Owner Information</div>
                ${owner.profile_image ? `<img src="../${owner.profile_image}" class="profile-image" alt="Profile">` : ''}
                <div class="detail-row">
                  <div class="detail-label">Name:</div>
                  <div class="detail-value">${owner.first_name} ${owner.last_name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Email:</div>
                  <div class="detail-value">${owner.email}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Phone:</div>
                  <div class="detail-value">${owner.phone || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Status:</div>
                  <div class="detail-value">
                    <span class="status-badge ${owner.status}">
                      ${owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Registered:</div>
                  <div class="detail-value">${new Date(owner.owner_created).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div class="business-section">
                <div class="section-title">Business Information</div>
                ${owner.logo_path ? `<img src="${owner.logo_path}" class="business-logo" alt="Business Logo">` : ''}
                <div class="detail-row">
                  <div class="detail-label">Business Name:</div>
                  <div class="detail-value">${owner.business_name || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Description:</div>
                  <div class="detail-value">${owner.business_description || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Address:</div>
                  <div class="detail-value">${owner.business_address || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Barangay:</div>
                  <div class="detail-value">${owner.barangay || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Contact Phone:</div>
                  <div class="detail-value">${owner.contact_phone || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Contact Email:</div>
                  <div class="detail-value">${owner.contact_email || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Business Hours:</div>
                  <div class="detail-value">${owner.business_hours || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Special Requirements:</div>
                  <div class="detail-value">${owner.special_requirements || 'None'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Materials Accepted:</div>
                  <div class="detail-value">
                    <div class="materials-list">
                      ${owner.materials_accepted ? 
                        owner.materials_accepted.split(', ').map(material => 
                          `<span class="material-tag">${material}</span>`
                        ).join('') : 
                        'N/A'}
                    </div>
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Business Status:</div>
                  <div class="detail-value">
                    <span class="status-badge ${owner.business_status}">
                      ${owner.business_status ? owner.business_status.charAt(0).toUpperCase() + owner.business_status.slice(1) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="verification-section">
                <div class="section-title">Verification Details</div>
                <div class="detail-row">
                  <div class="detail-label">ID Type:</div>
                  <div class="detail-value">${owner.id_type || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">ID Number:</div>
                  <div class="detail-value">${owner.id_number || 'N/A'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Verification Status:</div>
                  <div class="detail-value">
                    <span class="status-badge ${owner.verification_status}">
                      ${owner.verification_status ? owner.verification_status.charAt(0).toUpperCase() + owner.verification_status.slice(1) : 'N/A'}
                    </span>
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">ID Images:</div>
                  <div class="detail-value">
                    <div class="id-images">
                      ${owner.id_front_image ? `<img src="../uploads/ids/${owner.id_front_image}" class="id-image" alt="ID Front">` : 'No front image'}
                      ${owner.id_back_image ? `<img src="../uploads/ids/${owner.id_back_image}" class="id-image" alt="ID Back">` : 'No back image'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add modal to the DOM
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Show modal
      const modal = document.getElementById('owner-details-modal');
      modal.style.display = 'flex';
      
      // Close modal when clicking the X button
      modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
      });
      
      // Close modal when clicking outside
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });

      setupImageModal();
    })
    .catch(error => {
      console.error('Error fetching owner details:', error);
      alert('Failed to load owner details');
    });
}

function setupImageModal() {
  // Create modal elements
  const modalHTML = `
    <div id="imageModal" class="image-modal">
      <span class="close-image-modal">&times;</span>
      <div class="image-modal-content">
        <img id="modalImage" src="" alt="Enlarged view">
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Add click handlers for all ID images
  document.querySelectorAll('.id-image').forEach(img => {
    img.addEventListener('click', function() {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImage');
      modal.style.display = 'block';
      modalImg.src = this.src;
    });
  });
  
  // Close modal when clicking X
  document.querySelector('.close-image-modal').addEventListener('click', function() {
    document.getElementById('imageModal').style.display = 'none';
  });
  
  // Close modal when clicking outside image
  document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
}




});

