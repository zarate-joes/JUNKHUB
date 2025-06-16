<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header('Location: ../Owner Registration/owner_sign_in.php');
    exit();
}

// Database connection - use the correct path to your dbconnect.php
require_once '../Backend/dbconnect.php';

// Fetch admin data - use the $pdo variable from dbconnect.php
$query = "SELECT * FROM admins WHERE admin_id = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$_SESSION['admin']['id']]); // Use the admin ID from session
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$admin) {
    die("Admin not found in database.");
}

// Fetch login history (we'll simulate this since it's not in your database schema)
$loginHistory = [
    ['login_time' => '2025-06-14 06:34:22', 'ip_address' => '192.168.1.1', 'status' => 'success'],
    ['login_time' => '2025-06-13 15:22:10', 'ip_address' => '192.168.1.1', 'status' => 'success'],
    ['login_time' => '2025-06-12 09:45:33', 'ip_address' => '203.145.67.22', 'status' => 'success'],
    ['login_time' => '2025-06-10 14:12:45', 'ip_address' => '203.145.67.22', 'status' => 'failed'],
];
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Profile - JunkHub</title>
  <link rel="stylesheet" href="admin.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="../Images/teallogo22619-foad-200h.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    /* Additional styles for profile page */
    .profile-container {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 30px;
      margin-top: 20px;
    }
    
    .profile-sidebar {
      background: white;
      border-radius: 8px;
      padding: 25px;
      box-shadow: 0 0 15px rgba(0,0,0,0.05);
      text-align: center;
    }
    
    .profile-picture {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto 20px;
      border: 5px solid #f8f9fa;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .profile-name {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 5px;
      color: #293840;
    }
    
    .profile-role {
      color: #6c757d;
      margin-bottom: 20px;
      font-size: 14px;
    }
    
    .profile-stats {
      display: flex;
      justify-content: space-around;
      margin: 25px 0;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-size: 18px;
      font-weight: 700;
      color: #293840;
    }
    
    .stat-label {
      font-size: 12px;
      color: #6c757d;
      text-transform: uppercase;
    }
    
    .profile-content {
      background: white;
      border-radius: 8px;
      padding: 25px;
      box-shadow: 0 0 15px rgba(0,0,0,0.05);
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #293840;
      padding-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .info-group {
      margin-bottom: 20px;
    }
    
    .info-label {
      font-weight: 600;
      color: #6c757d;
      font-size: 14px;
      margin-bottom: 5px;
    }
    
    .info-value {
      font-size: 16px;
      color: #293840;
      padding: 8px 12px;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .edit-profile-btn {
      background-color: #293840;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 20px;
    }
    
    .edit-profile-btn:hover {
      background-color: #1f2d34;
      transform: translateY(-1px);
    }
    
    /* Security section */
    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .security-info {
      flex: 1;
    }
    
    .security-title {
      font-weight: 600;
      color: #293840;
      margin-bottom: 5px;
    }
    
    .security-desc {
      color: #6c757d;
      font-size: 14px;
    }
    
    .security-action {
      margin-left: 20px;
    }
    
    .change-btn {
      background-color: #f8f9fa;
      color: #293840;
      border: 1px solid #e0e0e0;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    
    .change-btn:hover {
      background-color: #e9ecef;
    }
    
    /* Login Activity Modal */
    .login-activity-modal .modal-content {
      max-width: 800px;
    }
    
    .login-activity-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    
    .login-activity-table th, 
    .login-activity-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .login-activity-table th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #293840;
    }
    
    .login-activity-table tr:hover {
      background-color: #f8f9fa;
    }
    
    .login-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .login-status.success {
      background-color: #d4edda;
      color: #155724;
    }
    
    .login-status.failed {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    /* Modal specific styles */
    .profile-modal .modal-content {
      max-width: 600px;
    }
    
    .profile-form .form-group {
      margin-bottom: 20px;
    }
    
    .profile-form .form-row {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .profile-form .form-row .form-group {
      flex: 1;
    }
    
    .profile-form label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #293840;
      font-size: 14px;
    }
    
    .profile-form input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .profile-form input:focus {
      border-color: #4e73df;
      box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.1);
      outline: none;
    }
    
    .upload-photo {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .upload-preview {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #e0e0e0;
    }
    
    .upload-btn {
      position: relative;
    }
    
    .upload-btn input[type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    
    .upload-btn-label {
      background-color: #f8f9fa;
      color: #293840;
      border: 1px solid #e0e0e0;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    
    .upload-btn-label:hover {
      background-color: #e9ecef;
    }
  </style>
</head>

<body>
  <div class="header">
    <div class="divider-line"></div>

    <a href="../Admin Profile/admin_profile.php">
      <div class="profile-icon">
        <img src="./pngs/prof.png" alt="Profile">
      </div>
    </a>

    <div class="admin-text">
      <span>Admin</span>
    </div>

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
      <a href="admin.php" class="menu-item">
        <i class="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </a>
      
      <a href="admin.php?tab=analytics" class="menu-item">
        <i class="fas fa-chart-line"></i>
        <span>Analytics</span>
      </a>
      
      <a href="admin.php?tab=orders" class="menu-item">
        <i class="fas fa-clipboard-list"></i>
        <span>Monitor Orders</span>
      </a>
      
      <a href="admin.php?tab=reports" class="menu-item">
        <i class="fas fa-file-alt"></i>
        <span>Generate Reports</span>
      </a>
      
      <a href="admin.php?tab=users" class="menu-item">
        <i class="fas fa-users-cog"></i>
        <span>Manage Users</span>
      </a>

      <a href="admin.php?tab=review" class="menu-item">
        <i class="fas fa-user-check"></i>
        <span>Review Owner Accounts</span>
      </a>
      
      <div class="menu-item sign-out">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sign Out</span>
      </div>
    </div>
  </div>

  <div class="main-content">
    <div class="content-header">
      <h2>Admin Profile</h2>
      <div class="breadcrumb">Home / Profile</div>
    </div>
    
    <div class="profile-container">
      <div class="profile-sidebar">
        <img src="./pngs/prof.png" alt="Admin Profile" class="profile-picture" id="profilePicture">
        <h3 class="profile-name"><?php echo htmlspecialchars($admin['first_name'] . ' ' . $admin['last_name']); ?></h3>
        <div class="profile-role">System Administrator</div>
        
        <div class="profile-stats">
          <div class="stat-item">
            <div class="stat-value"><?php echo date('M j, Y', strtotime($admin['created_at'])); ?></div>
            <div class="stat-label">Joined</div>
          </div>
          <div class="stat-item">
            <div class="stat-value"><?php echo $admin['last_login'] ? date('M j', strtotime($admin['last_login'])) : 'Never'; ?></div>
            <div class="stat-label">Last Login</div>
          </div>
        </div>
        
        <button class="edit-profile-btn" id="editProfileBtn">
          <i class="fas fa-edit"></i> Edit Profile
        </button>
      </div>
      
      <div class="profile-content">
        <h3 class="section-title">Personal Information</h3>
        
        <div class="info-group">
          <div class="info-label">First Name</div>
          <div class="info-value"><?php echo htmlspecialchars($admin['first_name']); ?></div>
        </div>
        
        <div class="info-group">
          <div class="info-label">Last Name</div>
          <div class="info-value"><?php echo htmlspecialchars($admin['last_name']); ?></div>
        </div>
        
        <div class="info-group">
          <div class="info-label">Email Address</div>
          <div class="info-value"><?php echo htmlspecialchars($admin['email']); ?></div>
        </div>
        
        <div class="info-group">
          <div class="info-label">Account Status</div>
          <div class="info-value" style="text-transform: capitalize;"><?php echo htmlspecialchars($admin['status']); ?></div>
        </div>
        
        <h3 class="section-title" style="margin-top: 30px;">Security</h3>
        
        <div class="security-item">
          <div class="security-info">
            <div class="security-title">Password</div>
            <div class="security-desc">Last changed <?php echo $admin['last_login'] ? date('M j, Y', strtotime($admin['last_login'])) : 'never'; ?></div>
          </div>
          <div class="security-action">
            <button class="change-btn" id="changePasswordBtn">Change</button>
          </div>
        </div>
        
        <div class="security-item" style="border-bottom: none;">
          <div class="security-info">
            <div class="security-title">Login Activity</div>
            <div class="security-desc">Review recent login attempts</div>
          </div>
          <div class="security-action">
            <button class="change-btn" id="viewLoginActivityBtn">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Profile Modal -->
  <div class="modal profile-modal" id="editProfileModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Edit Profile</h3>
        <button class="close-modal">&times;</button>
      </div>
      
      <form class="profile-form" id="profileForm">
        <div class="upload-photo">
          <img src="./pngs/prof.png" alt="Profile Preview" class="upload-preview" id="profilePreview">
          <div class="upload-btn">
            <input type="file" id="profileUpload" accept="image/*">
            <label for="profileUpload" class="upload-btn-label">Change Photo</label>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" value="<?php echo htmlspecialchars($admin['first_name']); ?>" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" value="<?php echo htmlspecialchars($admin['last_name']); ?>" required>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" value="<?php echo htmlspecialchars($admin['email']); ?>" required>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn">
            <i class="fas fa-save"></i> Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Change Password Modal -->
  <div class="modal" id="changePasswordModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Change Password</h3>
        <button class="close-modal">&times;</button>
      </div>
      
      <form class="profile-form" id="passwordForm">
        <div class="form-group password-toggle">
          <label for="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" required>
          <i class="fas fa-eye toggle-icon" data-target="currentPassword"></i>
        </div>
        
        <div class="form-group password-toggle">
          <label for="newPassword">New Password</label>
          <input type="password" id="newPassword" required>
          <i class="fas fa-eye toggle-icon" data-target="newPassword"></i>
        </div>
        
        <div class="form-group password-toggle">
          <label for="confirmPassword">Confirm New Password</label>
          <input type="password" id="confirmPassword" required>
          <i class="fas fa-eye toggle-icon" data-target="confirmPassword"></i>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn">
            <i class="fas fa-key"></i> Update Password
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Login Activity Modal -->
  <div class="modal login-activity-modal" id="loginActivityModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Login Activity</h3>
        <button class="close-modal">&times;</button>
      </div>
      
      <div class="modal-body">
        <table class="login-activity-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>IP Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($loginHistory as $login): ?>
            <tr>
              <td><?php echo date('M j, Y g:i A', strtotime($login['login_time'])); ?></td>
              <td><?php echo htmlspecialchars($login['ip_address']); ?></td>
              <td>
                <span class="login-status <?php echo htmlspecialchars($login['status']); ?>">
                  <?php echo ucfirst(htmlspecialchars($login['status'])); ?>
                </span>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="cancel-btn">Close</button>
      </div>
    </div>
  </div>

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

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
    // DOM Elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordModal = document.getElementById('changePasswordModal');
    const viewLoginActivityBtn = document.getElementById('viewLoginActivityBtn');
    const loginActivityModal = document.getElementById('loginActivityModal');
    const closeModals = document.querySelectorAll('.close-modal, .cancel-btn');
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');
    const profilePicture = document.getElementById('profilePicture');
    const toggleIcons = document.querySelectorAll('.toggle-icon');
    
    // Open edit profile modal
    editProfileBtn.addEventListener('click', () => {
      editProfileModal.style.display = 'flex';
    });
    
    // Open change password modal
    changePasswordBtn.addEventListener('click', () => {
      changePasswordModal.style.display = 'flex';
    });
    
    // Open login activity modal
    viewLoginActivityBtn.addEventListener('click', () => {
      loginActivityModal.style.display = 'flex';
    });
    
    // Close modals
    closeModals.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
          modal.style.display = 'none';
        });
      });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });
    
    // Profile image upload preview
    profileUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profilePreview.src = event.target.result;
          profilePicture.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Toggle password visibility
    toggleIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const targetId = icon.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });
    
    // Form submissions (would be handled with AJAX in a real implementation)
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you would typically send the form data to the server via AJAX
      alert('Profile updated successfully!');
      editProfileModal.style.display = 'none';
    });
    
    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Here you would typically send the form data to the server via AJAX
      alert('Password changed successfully!');
      changePasswordModal.style.display = 'none';
    });
    
    // Sign out functionality (from your existing admin.js)
    const signOutBtn = document.querySelector('.sign-out');
    const signOutModal = document.querySelector('.signout-modal');
    const signOutCancelBtn = document.querySelector('.signout-cancel-btn');
    const signOutConfirmBtn = document.querySelector('.signout-confirm-btn');
    
    signOutBtn.addEventListener('click', () => {
      signOutModal.style.display = 'flex';
    });
    
    signOutCancelBtn.addEventListener('click', () => {
      signOutModal.style.display = 'none';
    });
    
    signOutConfirmBtn.addEventListener('click', () => {
      // In a real implementation, this would redirect to a logout script
      window.location.href = '../Owner Registration/owner_sign_in.php';
    });
  </script>
</body>
</html>