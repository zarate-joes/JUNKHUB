document.addEventListener('DOMContentLoaded', function () {
  // Menu item activation
  const menuItems = document.querySelectorAll('.menu-item');
  const mainContent = document.querySelector('.main-content');
  
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
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
      
      <div class="analytics-stats">
        <div class="analytics-stat-card">
          <h3>Total Page Views</h3>
          <div class="analytics-stat-value">28,740</div>
        </div>
        
        <div class="analytics-stat-card">
          <h3>Conversion Rate</h3>
          <div class="analytics-stat-value">3.9%</div>
        </div>
        
        <div class="analytics-stat-card">
          <h3>Avg. Session Duration</h3>
          <div class="analytics-stat-value">2m 34s</div>
        </div>
      </div>
      
      <div class="analytics-filters">
        <div class="filter-option">
          <input type="checkbox" id="pageViews" checked>
          <label for="pageViews">Page Views</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="productSales" checked>
          <label for="productSales">Product Sales</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="orders" checked>
          <label for="orders">Orders</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="users" checked>
          <label for="users">Users</label>
        </div>
      </div>
      
      <div class="analytics-chart-container">
        <canvas id="analyticsChart"></canvas>
      </div>
    `;
    
    // Initialize analytics chart
    initAnalyticsChart();
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
    new Chart(ctx, {
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
            fill: true
          },
          {
            label: 'Product Sales',
            data: [3000, 4000, 5000, 6000, 7000, 8000, 9000],
            borderColor: 'rgba(28, 200, 138, 1)',
            backgroundColor: 'rgba(28, 200, 138, 0.1)',
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Orders',
            data: [2000, 3000, 4000, 5000, 6000, 7000, 8000],
            borderColor: 'rgba(54, 185, 204, 1)',
            backgroundColor: 'rgba(54, 185, 204, 0.1)',
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Users',
            data: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
            borderColor: 'rgba(246, 194, 62, 1)',
            backgroundColor: 'rgba(246, 194, 62, 0.1)',
            borderWidth: 2,
            fill: true
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

  // Placeholder functions for other menu items
  function loadOrdersContent() {
    mainContent.innerHTML = `<div class="content-header">
      <h2>Order Monitoring</h2>
      <div class="breadcrumb">Home / Orders</div>
    </div>`;
  }

  function loadReportsContent() {
    mainContent.innerHTML = `<div class="content-header">
      <h2>Report Generation</h2>
      <div class="breadcrumb">Home / Reports</div>
    </div>`;
  }

  function loadUsersContent() {
    mainContent.innerHTML = `<div class="content-header">
      <h2>User Management</h2>
      <div class="breadcrumb">Home / Users</div>
    </div>`;
  }
});