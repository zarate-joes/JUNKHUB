<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JunkHUB - Create Shop</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon" type="image/png" href="../Images/teallogo22619-foad-200h.png">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="shopsignup.css">
</head>
<body>

  <div class="signup-container">
    <div class="signup-wrapper">
      <!-- Top Panel (formerly Left Panel / Brand section) -->
      <div class="top-panel">
        <div class="brand-container">
          <a href="../Landing Page/index.php" class="brand-link">
            <h1 class="brand-name">Welcome to 
                <img src="https://c.animaapp.com/X9op69Wd/img/teallogo-2@2x.png" alt="JunkHUB Logo" class="brand-logo">
                <span class="brand-highlight">Junk</span>
                HUB</h1>
          </a>
          
          <div class="welcome-content">
            <h2 class="welcome-title">Set up your shop to start selling recyclable materials</h2>
            <p class="welcome-text">Create your shop profile to connect with customers looking for recyclable materials.</p>
          </div>
        </div>
        
        <div class="decorative-elements">
          <div class="deco-rect-1"></div>
          <div class="deco-rect-2"></div>
        </div>
      </div>
      
      <!-- Form Panel -->
      <div class="form-panel">
        <!-- Progress indicator -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-completed" id="progressBar"></div>
          </div>
          <div class="progress-steps">
            <div class="step" id="step1">
              <div class="step-number">1</div>
              <div class="step-label">Shop Details</div>
            </div>
            <div class="step" id="step2">
              <div class="step-number">2</div>
              <div class="step-label">Materials</div>
            </div>
            <div class="step" id="step3">
              <div class="step-number">3</div>
              <div class="step-label">Review & Launch</div>
            </div>
          </div>
        </div>

        <div class="message-container">
            <?php
            // Display success message if exists
            if (isset($_SESSION['success'])) {
                echo '<div class="alert alert-success">'.htmlspecialchars($_SESSION['success']).'</div>';
                unset($_SESSION['success']);
            }
            
            // Display error messages if exists
            if (isset($_SESSION['errors'])) {
                echo '<div class="alert alert-danger">';
                foreach ($_SESSION['errors'] as $error) {
                    echo '<p>'.htmlspecialchars($error).'</p>';
                }
                echo '</div>';
                unset($_SESSION['errors']);
            }
            ?>
        </div>
        
        <!-- Form sections -->
        <form id="shopCreationForm" method="POST" action="shop-creation.php" enctype="multipart/form-data" class="form-content">
          <!-- Shop Details Tab -->
          <section class="form-tab" id="shopDetailsTab">
            <section class="form-section">
              <h2 class="section-title">Basic Information</h2>
              
              <div class="form-group">
                <label for="shopName">Shop Name <span class="required">*</span></label>
                <input type="text" id="shopName" name="shopName" placeholder="Enter your shop name" required 
                       value="<?php echo isset($_SESSION['old']['shopName']) ? htmlspecialchars($_SESSION['old']['shopName']) : ''; ?>">
                <p class="form-hint">This will be displayed to customers on JunkHub</p>
              </div>
              
              <div class="form-group">
                <label for="shopDescription">Shop Description</label>
                <textarea id="shopDescription" name="shopDescription" rows="4" placeholder="Describe your shop and what you offer"><?php echo isset($_SESSION['old']['shopDescription']) ? htmlspecialchars($_SESSION['old']['shopDescription']) : ''; ?></textarea>
              </div>
              
              <div class="form-group">
                <label for="shopLogo">Shop Logo</label>
                <div class="file-upload-container">
                  <input type="file" id="shopLogo" name="shopLogo" accept="image/*" style="display: none;">
                  <div class="file-upload-box" onclick="document.getElementById('shopLogo').click()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                    <p class="upload-title">Drag and drop your logo here</p>
                    <p class="upload-subtitle">or click to browse files</p>
                    <p class="upload-info">Recommended size: 500 x 500 pixels</p>
                  </div>
                  <div id="fileNameDisplay"></div>
                </div>
              </div>
            </section>
            
            <section class="form-section">
              <h2 class="section-title">Contact Information</h2>
              
              <div class="form-group">
                <label for="contactPhone">Contact Phone <span class="required">*</span></label>
                <input type="tel" id="contactPhone" name="contactPhone" placeholder="Enter your phone number" required
                       value="<?php echo isset($_SESSION['old']['contactPhone']) ? htmlspecialchars($_SESSION['old']['contactPhone']) : ''; ?>">
              </div>
              
              <div class="form-group">
                <label for="contactEmail">Contact Email <span class="required">*</span></label>
                <input type="email" id="contactEmail" name="contactEmail" placeholder="Enter your email address" required
                       value="<?php echo isset($_SESSION['old']['contactEmail']) ? htmlspecialchars($_SESSION['old']['contactEmail']) : ''; ?>">
              </div>
            </section>
            
            <section class="form-section">
              <h2 class="section-title">Location</h2>
              
              <div class="form-group">
                <label for="fullAddress">Full Address <span class="required">*</span></label>
                <input type="text" id="fullAddress" name="fullAddress" placeholder="Enter your full address" required
                       value="<?php echo isset($_SESSION['old']['fullAddress']) ? htmlspecialchars($_SESSION['old']['fullAddress']) : ''; ?>">
              </div>
              
              <div class="form-group">
                <label for="barangay">Barangay <span class="required">*</span></label>
                <select id="barangay" name="barangay" required>
                  <option value="" disabled selected>Select your barangay</option>
                  <option value="barangay1" <?php echo (isset($_SESSION['old']['barangay'])) && $_SESSION['old']['barangay'] === 'barangay1' ? 'selected' : ''; ?>>Barangay 1</option>
                  <option value="barangay2" <?php echo (isset($_SESSION['old']['barangay'])) && $_SESSION['old']['barangay'] === 'barangay2' ? 'selected' : ''; ?>>Barangay 2</option>
                  <option value="barangay3" <?php echo (isset($_SESSION['old']['barangay'])) && $_SESSION['old']['barangay'] === 'barangay3' ? 'selected' : ''; ?>>Barangay 3</option>
                </select>
              </div>
            </section>
            
            <section class="form-section">
              <h2 class="section-title">Business Hours</h2>
              
              <div class="form-group">
                <label for="businessHours">When are you open for business?</label>
                <select id="businessHours" name="businessHours">
                  <option value="everyday" <?php echo (isset($_SESSION['old']['businessHours'])) && $_SESSION['old']['businessHours'] === 'everyday' ? 'selected' : ''; ?>>Everyday (8 AM - 5 PM)</option>
                  <option value="weekdays" <?php echo (isset($_SESSION['old']['businessHours'])) && $_SESSION['old']['businessHours'] === 'weekdays' ? 'selected' : ''; ?>>Weekdays (8 AM - 5 PM)</option>
                  <option value="weekends" <?php echo (isset($_SESSION['old']['businessHours'])) && $_SESSION['old']['businessHours'] === 'weekends' ? 'selected' : ''; ?>>Weekends (8 AM - 5 PM)</option>
                  <option value="custom" <?php echo (isset($_SESSION['old']['businessHours'])) && $_SESSION['old']['businessHours'] === 'custom' ? 'selected' : ''; ?>>Custom Hours</option>
                </select>
              </div>
            </section>
            
            <div class="form-actions">
              <button class="back-button" id="backToLanding" name="backToLanding">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK
              </button>
              <button class="continue-button" id="continueToMaterials" name="continueToMaterials">
                CONTINUE
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>

          <!-- Materials Tab -->
          <section class="form-tab" id="materialsTab" style="display: none;">
            <section class="form-section">
              <h2 class="section-title">Materials You Accept</h2>
              
              <div class="form-group">
                <p class="section-subtitle">Select the types of materials your shop accepts:</p>
                
                <div class="materials-categories">
                  <!-- Common Materials Category -->
                  <div class="materials-category">
                    <h3 class="category-title">Common Materials</h3>
                    <div class="materials-grid">
                      <div class="material-item">
                        <input type="checkbox" id="material-plastic" name="materials[]" value="plastic">
                        <label for="material-plastic">
                          <span class="material-icon">♻️</span>
                          <span class="material-name">Plastic</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-paper" name="materials[]" value="paper">
                        <label for="material-paper">
                          <span class="material-icon">📄</span>
                          <span class="material-name">Paper</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-metal" name="materials[]" value="metal">
                        <label for="material-metal">
                          <span class="material-icon">🔩</span>
                          <span class="material-name">Metal</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-glass" name="materials[]" value="glass">
                        <label for="material-glass">
                          <span class="material-icon">🍶</span>
                          <span class="material-name">Glass</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Specialized Materials Category -->
                  <div class="materials-category">
                    <h3 class="category-title">Specialized Materials</h3>
                    <div class="materials-grid">
                      <div class="material-item">
                        <input type="checkbox" id="material-electronics" name="materials[]" value="electronics">
                        <label for="material-electronics">
                          <span class="material-icon">💻</span>
                          <span class="material-name">Electronics</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-textiles" name="materials[]" value="textiles">
                        <label for="material-textiles">
                          <span class="material-icon">👕</span>
                          <span class="material-name">Textiles</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-organic" name="materials[]" value="organic">
                        <label for="material-organic">
                          <span class="material-icon">🌱</span>
                          <span class="material-name">Organic Waste</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-other" name="materials[]" value="other">
                        <label for="material-other">
                          <span class="material-icon">❓</span>
                          <span class="material-name">Other</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="materials-note">
                <div class="note-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4M12 8h.01"></path>
                  </svg>
                  <div class="note-text">
                    <p class="note-description">Don't worry! You can always update your accepted materials later in your shop settings. Just select the materials you're most comfortable collecting right now.</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section class="form-section">
              <h2 class="section-title">Additional Information</h2>
              
              <div class="form-group">
                <label for="specialRequirements">Special Requirements</label>
                <textarea id="specialRequirements" name="specialRequirements" rows="3" placeholder="Do you have any special requirements for the materials? (e.g., clean, sorted, etc.)"></textarea>
              </div>
            </section>

            <div class="form-actions">
              <button class="back-button" id="backToShopDetails" name="backToShopDetails"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK
              </button>
              <button class="continue-button" id="continueToReview" name="continueToReview">
                CONTINUE
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>

          <!-- Review & Launch Tab -->
          <section class="form-tab" id="reviewTab" style="display: none;">
            <section class="form-section">
              <h2 class="section-title">Review Your Shop Details</h2>
              
              <div class="review-summary">
                <div class="review-section">
                  <h3 class="review-section-title">Basic Information</h3>
                  <div class="review-item">
                    <span class="review-label">Shop Name:</span>
                    <span class="review-value" id="reviewShopName">-</span>
                  </div>
                  <div class="review-item">
                    <span class="review-label">Shop Description:</span>
                    <span class="review-value" id="reviewShopDescription">-</span>
                  </div>
                </div>
                
                <div class="review-section">
                  <h3 class="review-section-title">Contact Information</h3>
                  <div class="review-item">
                    <span class="review-label">Phone:</span>
                    <span class="review-value" id="reviewContactPhone">-</span>
                  </div>
                  <div class="review-item">
                    <span class="review-label">Email:</span>
                    <span class="review-value" id="reviewContactEmail">-</span>
                  </div>
                </div>
                
                <div class="review-section">
                  <h3 class="review-section-title">Location</h3>
                  <div class="review-item">
                    <span class="review-label">Address:</span>
                    <span class="review-value" id="reviewFullAddress">-</span>
                  </div>
                  <div class="review-item">
                    <span class="review-label">Barangay:</span>
                    <span class="review-value" id="reviewBarangay">-</span>
                  </div>
                </div>
                
                <div class="review-section">
                  <h3 class="review-section-title">Business Hours</h3>
                  <div class="review-item">
                    <span class="review-label">Hours:</span>
                    <span class="review-value" id="reviewBusinessHours">-</span>
                  </div>
                </div>
                
                <div class="review-section">
                  <h3 class="review-section-title">Materials Accepted</h3>
                  <div class="review-item">
                    <span class="review-label">Materials:</span>
                    <span class="review-value" id="reviewMaterials">-</span>
                  </div>
                  <div class="review-item">
                    <span class="review-label">Special Requirements:</span>
                    <span class="review-value" id="reviewSpecialRequirements">-</span>
                  </div>
                </div>
              </div>
            </section>
            
            <section class="form-section">
              <h2 class="section-title">Terms & Conditions</h2>
              
              <div class="form-group">
                <div class="terms-container">
                  <input type="checkbox" id="agreeTerms" required>
                  <label for="agreeTerms">I agree to the JunkHUB <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. I confirm that all information provided is accurate.</label>
                </div>
              </div>
            </section>
            
            <div class="form-actions">
              <button class="back-button" id="backToMaterials" name="backToMaterials">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK
              </button>
              <button class="continue-button" id="launchShop" name="launchShop">
                LAUNCH SHOP
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>

          <?php
          // Clear old session data after use
          unset($_SESSION['old']);
          ?>
        </form>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Script loaded');
        
        // Tab navigation
        const shopDetailsTab = document.getElementById('shopDetailsTab');
        const materialsTab = document.getElementById('materialsTab');
        const reviewTab = document.getElementById('reviewTab');
        
        // Buttons
        const continueToMaterials = document.getElementById('continueToMaterials');
        const continueToReview = document.getElementById('continueToReview');
        const backToShopDetails = document.getElementById('backToShopDetails');
        const backToMaterials = document.getElementById('backToMaterials');
        const backToLanding = document.getElementById('backToLanding');
        const launchShop = document.getElementById('launchShop');
        
        // Progress bar and steps
        const progressBar = document.getElementById('progressBar');
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');
        
        // ===== ADD THE VALIDATION FUNCTIONS HERE =====
        function validateShopDetails() {
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Shop Name validation
            const shopName = document.getElementById('shopName');
            if (!shopName.value.trim()) {
                showError(shopName, 'Shop name is required');
                isValid = false;
            }
            
            // Contact Phone validation
            const contactPhone = document.getElementById('contactPhone');
            if (!contactPhone.value.trim()) {
                showError(contactPhone, 'Contact phone is required');
                isValid = false;
            } else if (!/^[\d\s\-+]{10,15}$/.test(contactPhone.value)) {
                showError(contactPhone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Contact Email validation
            const contactEmail = document.getElementById('contactEmail');
            if (!contactEmail.value.trim()) {
                showError(contactEmail, 'Contact email is required');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value)) {
                showError(contactEmail, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Address validation
            const fullAddress = document.getElementById('fullAddress');
            if (!fullAddress.value.trim()) {
                showError(fullAddress, 'Address is required');
                isValid = false;
            }
            
            // Barangay validation
            const barangay = document.getElementById('barangay');
            if (!barangay.value) {
                showError(barangay, 'Barangay is required');
                isValid = false;
            }
            
            return isValid;
        }

        function showError(field, message) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#dc3545';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            errorElement.textContent = message;
            field.parentNode.appendChild(errorElement);
        }
        // ===== END OF VALIDATION FUNCTIONS =====

        // Initialize first step as active
        if (step1) step1.classList.add('active');

        // Highlight fields with errors if any
        if (document.querySelector('.alert-danger')) {
            const errorFields = {
                'shopName': 'shopName',
                'contactPhone': 'contactPhone',
                'contactEmail': 'contactEmail',
                'fullAddress': 'fullAddress',
                'barangay': 'barangay',
                'shopLogo': 'shopLogo'
            };
            
            Object.keys(errorFields).forEach(fieldName => {
                const field = document.getElementById(errorFields[fieldName]);
                if (field) {
                    // Check if error message contains the field name
                    const errorContainer = document.querySelector('.alert-danger');
                    if (errorContainer.textContent.toLowerCase().includes(fieldName.toLowerCase())) {
                        field.classList.add('error');
                    }
                }
            });
            
            // If there are errors, make sure we're on the first tab
            if (shopDetailsTab) shopDetailsTab.style.display = 'block';
            if (materialsTab) materialsTab.style.display = 'none';
            if (reviewTab) reviewTab.style.display = 'none';
            if (progressBar) progressBar.style.width = '33.33%';
            if (step2) step2.classList.remove('active');
            if (step3) step3.classList.remove('active');
            if (step1) step1.classList.add('active');
        }

        // ===== REPLACE THE EXISTING continueToMaterials EVENT LISTENER WITH THIS =====
        if (continueToMaterials) {
            continueToMaterials.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (validateShopDetails()) {
                    shopDetailsTab.style.display = 'none';
                    materialsTab.style.display = 'block';
                    if (progressBar) progressBar.style.width = '66.66%';
                    if (step1) step1.classList.remove('active');
                    if (step2) step2.classList.add('active');
                }
            });
        }
        
        // Continue to Review tab
        if (continueToReview) {
            continueToReview.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update review section with entered values
                document.getElementById('reviewShopName').textContent = document.getElementById('shopName').value || '-';
                document.getElementById('reviewShopDescription').textContent = document.getElementById('shopDescription').value || '-';
                document.getElementById('reviewContactPhone').textContent = document.getElementById('contactPhone').value || '-';
                document.getElementById('reviewContactEmail').textContent = document.getElementById('contactEmail').value || '-';
                document.getElementById('reviewFullAddress').textContent = document.getElementById('fullAddress').value || '-';
                document.getElementById('reviewBarangay').textContent = document.getElementById('barangay').options[document.getElementById('barangay').selectedIndex].text || '-';
                document.getElementById('reviewBusinessHours').textContent = document.getElementById('businessHours').options[document.getElementById('businessHours').selectedIndex].text || '-';
                
                // Get selected materials
                const materialCheckboxes = document.querySelectorAll('input[name="materials[]"]:checked');
                const selectedMaterials = Array.from(materialCheckboxes).map(cb => {
                    const label = cb.closest('.material-item').querySelector('.material-name');
                    return label ? label.textContent : '';
                }).filter(Boolean).join(', ') || 'None selected';
                document.getElementById('reviewMaterials').textContent = selectedMaterials;
                
                document.getElementById('reviewSpecialRequirements').textContent = document.getElementById('specialRequirements').value || '-';
                
                // Switch tabs
                materialsTab.style.display = 'none';
                reviewTab.style.display = 'block';
                if (progressBar) progressBar.style.width = '100%';
                if (step2) step2.classList.remove('active');
                if (step3) step3.classList.add('active');
            });
        }
        
        // Back to Shop Details tab
        if (backToShopDetails) {
            backToShopDetails.addEventListener('click', function(e) {
                e.preventDefault();
                materialsTab.style.display = 'none';
                shopDetailsTab.style.display = 'block';
                if (progressBar) progressBar.style.width = '33.33%';
                if (step2) step2.classList.remove('active');
                if (step1) step1.classList.add('active');
            });
        }
        
        // Back to Materials tab
        if (backToMaterials) {
            backToMaterials.addEventListener('click', function(e) {
                e.preventDefault();
                reviewTab.style.display = 'none';
                materialsTab.style.display = 'block';
                if (progressBar) progressBar.style.width = '66.66%';
                if (step3) step3.classList.remove('active');
                if (step2) step2.classList.add('active');
            });
        }
        
        // Back to Landing page
        if (backToLanding) {
            backToLanding.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = '../Landing Page/index.php';
            });
        }
        
        // Launch Shop
        if (launchShop) {
            launchShop.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (document.getElementById('agreeTerms').checked) {
                    updateFormFields();
                    document.getElementById('shopCreationForm').submit();
                } else {
                    alert('Please agree to the Terms & Conditions before launching your shop.');
                }
            });
        }
        
        // File upload display
        const shopLogoInput = document.getElementById('shopLogo');
        if (shopLogoInput) {
            shopLogoInput.addEventListener('change', function(e) {
                const fileName = e.target.files[0]?.name || 'No file selected';
                const fileNameDisplay = document.getElementById('fileNameDisplay');
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = fileName;
                }
            });
        }

    });

    console.log('Switching to materials tab'); // Should appear when clicking continue
    console.log('Shop tab display:', shopDetailsTab.style.display); // Should be 'none'
    console.log('Materials tab display:', materialsTab.style.display); // Should be 'block'
  </script>
  <script src="./greeting.js" defer></script>

</body>
</html>