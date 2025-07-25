<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header('Location: ../Owner Registration/owner_sign_in.php');
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard - JunkHub</title>
  <link rel="stylesheet" href="admin.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="../Images/teallogo22619-foad-200h.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body>
  <div class="header">
    <div class="divider-line"></div>

    <a href="admin_profile.php">
      <div class="profile-icon">
        <img src="./pngs/prof.png" alt="Profile">
      </div>
      <div class="admin-text">
        <span>Admin</span>
      </div>
    </a>

    <div class="notification-icon">
      <i class="fas fa-bell"></i>  
      <span class="badge">1</span>
    </div>

    <div class="search-container"> 
      <input type="text" placeholder="Search...">
    </div>
  </div>

  <div class="sidebar">
    <a href="../Landing Page/index.html" class="logo-brand-container">
      <div class="logo">
        <img src="./pngs/Logo.png" alt="Logo">
      </div>
      <h1 class="brand-name">
        <span class="text-gold">Junk</span><span class="text-black">HUB</span>
      </h1>
    </a>

    <div class="admin-menu">
      <div class="menu-item active">
        <i class="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </div>
      
      <div class="menu-item">
        <i class="fas fa-chart-line"></i>
        <span>Analytics</span>
      </div>
      
      <div class="menu-item">
        <i class="fas fa-clipboard-list"></i>
        <span>Monitor Orders</span>
      </div>
      
      <div class="menu-item">
        <i class="fas fa-file-alt"></i>
        <span>Generate Reports</span>
      </div>
      
      <div class="menu-item">
        <i class="fas fa-users-cog"></i>
        <span>Manage Users</span>
      </div>

      <div class="menu-item">
        <i class="fas fa-user-check"></i>
        <span>Review Owner Accounts</span>
      </div>
      
      <div class="menu-item sign-out">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sign Out</span>
      </div>
    </div>
  </div>

  <div class="main-content">
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
          <!-- More rows would go here -->
        </tbody>
      </table>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="admin.js"></script>




<!-- Sign Out Confirmation Modal -->
<div class="signout-modal">
  <div class="signout-modal-content">
    <div class="signout-modal-header">
      <i class="fas fa-sign-out-alt"></i>
      <h3>Confirm Sign Out</h3>
    </div>
    <p>Are you sure you want to sign out of your admin account?</p>
    <div class="signout-modal-buttons">
      <button class="signout-cancel-btn">Cancel</button>
      <button class="signout-confirm-btn">Sign Out</button>
    </div>
  </div>
</div>

</body>
</html>