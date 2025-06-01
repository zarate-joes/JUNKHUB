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
      }
    });
  });
  
  // Sign out confirmation button
  signoutConfirmBtn.addEventListener('click', function() {
    // In a real application, you would perform sign out logic here
    alert('You have been signed out');
    // Then redirect to login page
    window.location.href = '../Landing Page/index.html';
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




















function loadUsersContent() {
  mainContent.innerHTML = `
    <div class="content-header">
      <h2>Manage Users</h2>
      <div class="breadcrumb">Home / Manage Users</div>
    </div>
    
    <div class="users-filters" style="
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(0,0,0,0.05);
      flex-wrap: wrap;
    ">
      <div class="filter-group" style="display: flex; align-items: center; gap: 10px;">
        <label for="user-role" style="font-weight: 600; color: #293840;">Role:</label>
        <select id="user-role" style="
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background-color: white;
        ">
          <option value="all">All Users</option>
          <option value="admin">Admin</option>
          <option value="collector">Collector</option>
          <option value="user">Regular User</option>
        </select>
      </div>
      
      <div class="filter-group" style="display: flex; align-items: center; gap: 10px;">
        <label for="user-status" style="font-weight: 600; color: #293840;">Status:</label>
        <select id="user-status" style="
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background-color: white;
        ">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
      
      <div class="search-users" style="position: relative; flex-grow: 1;">
        <input type="text" placeholder="Search users..." style="
          padding: 8px 16px 8px 35px;
          border: 1px solid #e0e0e0;
          border-radius: 20px;
          outline: none;
          width: 100%;
          max-width: 300px;
        ">
        <i class="fas fa-search" style="
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        "></i>
      </div>
      
      <button class="add-user-btn" style="
        background-color: #293840;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        <i class="fas fa-plus"></i>
        Add User
      </button>
    </div>
    
    <div class="users-table-container" style="
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 0 15px rgba(0,0,0,0.05);
    ">
      <table class="users-table" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">User</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Email</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Role</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Status</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Joined</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 10px;">
              <img src="./pngs/prof.png" alt="User" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
              <span>John Doe</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">john.doe@example.com</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="role-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #d1e7dd;
                color: #0f5132;
              ">Admin</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="status-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #d1e7dd;
                color: #0f5132;
              ">Active</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2023-01-15</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <button class="action-btn view-btn" data-user="101"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-user="101"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-user="101"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 10px;">
              <img src="./pngs/prof.png" alt="User" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
              <span>Jane Smith</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">jane.smith@example.com</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="role-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #cce5ff;
                color: #004085;
              ">Collector</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="status-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #fff3cd;
                color: #856404;
              ">Pending</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2023-02-20</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <button class="action-btn view-btn" data-user="102"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-user="102"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-user="102"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 10px;">
              <img src="./pngs/prof.png" alt="User" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
              <span>Robert Johnson</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">robert.j@example.com</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="role-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #f8d7da;
                color: #721c24;
              ">User</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="status-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #f8d7da;
                color: #721c24;
              ">Suspended</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2023-03-10</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <button class="action-btn view-btn" data-user="103"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-user="103"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-user="103"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 10px;">
              <img src="./pngs/prof.png" alt="User" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
              <span>Emily Davis</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">emily.d@example.com</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="role-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #f8d7da;
                color: #721c24;
              ">User</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <span class="status-badge" style="
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                background-color: #d1e7dd;
                color: #0f5132;
              ">Active</span>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">2023-04-05</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">
              <button class="action-btn view-btn" data-user="104"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" data-user="104"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-user="104"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination" style="
        display: flex;
        justify-content: center;
        gap: 5px;
        margin-top: 20px;
      ">
        <button class="page-btn disabled" style="
          width: 35px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: white;
          color: #293840;
          cursor: pointer;
          transition: all 0.2s ease;
        "><i class="fas fa-chevron-left"></i></button>
        <button class="page-btn active" style="
          width: 35px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: #293840;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        ">1</button>
        <button class="page-btn" style="
          width: 35px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: white;
          color: #293840;
          cursor: pointer;
          transition: all 0.2s ease;
        ">2</button>
        <button class="page-btn" style="
          width: 35px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: white;
          color: #293840;
          cursor: pointer;
          transition: all 0.2s ease;
        ">3</button>
        <button class="page-btn" style="
          width: 35px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: white;
          color: #293840;
          cursor: pointer;
          transition: all 0.2s ease;
        "><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  `;

  // Add event listeners for action buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const userId = this.getAttribute('data-user');
      viewUser(userId);
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const userId = this.getAttribute('data-user');
      editUser(userId);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const userId = this.getAttribute('data-user');
      deleteUser(userId);
    });
  });

  // Add event listener for add user button
  document.querySelector('.add-user-btn').addEventListener('click', function() {
    addUser();
  });
}

// User action functions
function viewUser(userId) {
  alert(`Viewing user #${userId}`);
  // In a real application, you would show a modal or redirect to a user detail page
}

function editUser(userId) {
  alert(`Editing user #${userId}`);
  // In a real application, you would show an edit form
}

function deleteUser(userId) {
  if (confirm(`Are you sure you want to delete user #${userId}?`)) {
    alert(`User #${userId} deleted`);
    // In a real application, you would make an API call to delete the user
    // Then refresh the users table
  }
}

function addUser() {
  alert('Opening add user form');
  // In a real application, you would show a form to add a new user
}







  
});

