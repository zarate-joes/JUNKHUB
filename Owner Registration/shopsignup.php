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
        
        <!-- Form sections -->
        <div class="form-content">
          <!-- Shop Details Tab -->
          <section class="form-tab active" id="shopDetailsTab">
            <section class="form-section">
              <h2 class="section-title">Basic Information</h2>
              
              <div class="form-group">
                <label for="shopName">Shop Name <span class="required">*</span></label>
                <input type="text" id="shopName" placeholder="Enter your shop name" required>
                <p class="form-hint">This will be displayed to customers on JunkHub</p>
              </div>
              
              <div class="form-group">
                <label for="shopDescription">Shop Description</label>
                <textarea id="shopDescription" rows="4" placeholder="Describe your shop and what you offer"></textarea>
              </div>
              
              <div class="form-group">
                <label for="shopLogo">Shop Logo</label>
                <div class="file-upload-container">
                  <div class="file-upload-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                    <p class="upload-title">Drag and drop your logo here</p>
                    <p class="upload-subtitle">or click to browse files</p>
                    <p class="upload-info">Recommended size: 500 x 500 pixels</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section class="form-section">
              <h2 class="section-title">Contact Information</h2>
              
              <div class="form-group">
                <label for="contactPhone">Contact Phone <span class="required">*</span></label>
                <input type="tel" id="contactPhone" placeholder="Enter your phone number" required>
              </div>
              
              <div class="form-group">
                <label for="contactEmail">Contact Email <span class="required">*</span></label>
                <input type="email" id="contactEmail" placeholder="Enter your email address" required>
              </div>
            </section>
            
            <section class="form-section">
              <h2 class="section-title">Location</h2>
              
              <div class="form-group">
                <label for="fullAddress">Full Address <span class="required">*</span></label>
                <input type="text" id="fullAddress" placeholder="Enter your full address" required>
              </div>
              
              <div class="form-group">
                <label for="barangay">Barangay <span class="required">*</span></label>
                <select id="barangay" required>
                  <option value="" disabled selected>Select your barangay</option>
                  <option value="barangay1">Barangay 1</option>
                  <option value="barangay2">Barangay 2</option>
                  <option value="barangay3">Barangay 3</option>
                </select>
              </div>
            
            <section class="form-section">
              <h2 class="section-title">Business Hours</h2>
              
              <div class="form-group">
                <label for="businessHours">When are you open for business?</label>
                <select id="businessHours">
                  <option value="everyday">Everyday (8 AM - 5 PM)</option>
                  <option value="weekdays">Weekdays (8 AM - 5 PM)</option>
                  <option value="weekends">Weekends (8 AM - 5 PM)</option>
                  <option value="custom">Custom Hours</option>
                </select>
              </div>
            </section>
            
            <div class="form-actions">
              <button class="back-button" id="backToLanding">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK
              </button>
              <button class="continue-button" id="continueToMaterials">
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
                        <input type="checkbox" id="material-plastic" name="materials" value="plastic">
                        <label for="material-plastic">
                          <span class="material-icon">♻️</span>
                          <span class="material-name">Plastic</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-paper" name="materials" value="paper">
                        <label for="material-paper">
                          <span class="material-icon">📄</span>
                          <span class="material-name">Paper</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-metal" name="materials" value="metal">
                        <label for="material-metal">
                          <span class="material-icon">🔩</span>
                          <span class="material-name">Metal</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-glass" name="materials" value="glass">
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
                        <input type="checkbox" id="material-electronics" name="materials" value="electronics">
                        <label for="material-electronics">
                          <span class="material-icon">💻</span>
                          <span class="material-name">Electronics</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-textiles" name="materials" value="textiles">
                        <label for="material-textiles">
                          <span class="material-icon">👕</span>
                          <span class="material-name">Textiles</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-organic" name="materials" value="organic">
                        <label for="material-organic">
                          <span class="material-icon">🌱</span>
                          <span class="material-name">Organic Waste</span>
                        </label>
                      </div>
                      <div class="material-item">
                        <input type="checkbox" id="material-other" name="materials" value="other">
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
                <textarea id="specialRequirements" rows="3" placeholder="Do you have any special requirements for the materials? (e.g., clean, sorted, etc.)"></textarea>
              </div>
            </section>

            <div class="form-actions">
              <button class="back-button" id="backToShopDetails">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK
              </button>
              <button class="continue-button" id="continueToReview">
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
              <button class="back-button" id="backToMaterials">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK
              </button>
              <button class="continue-button" id="launchShop">
                LAUNCH SHOP
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
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
      
      // Pricing method toggle
      const pricingMethod = document.getElementById('pricingMethod');
      const fixedPriceContainer = document.getElementById('fixedPriceContainer');
      
      // Continue to Materials tab
      continueToMaterials.addEventListener('click', function() {
        // Basic validation for required fields
        const requiredFields = [
          document.getElementById('shopName'),
          document.getElementById('contactPhone'),
          document.getElementById('contactEmail'),
          document.getElementById('fullAddress'),
          document.getElementById('barangay')
        ];
        
        let isValid = true;
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#ff3860';
            isValid = false;
          }
        });
        
        if (isValid) {
          shopDetailsTab.style.display = 'none';
          materialsTab.style.display = 'block';
          progressBar.style.width = '66.66%';
          step1.classList.remove('active');
          step2.classList.add('active');
        }
      });
      
      // Continue to Review tab
      continueToReview.addEventListener('click', function() {
        // Update review section with entered values
        document.getElementById('reviewShopName').textContent = document.getElementById('shopName').value || '-';
        document.getElementById('reviewShopDescription').textContent = document.getElementById('shopDescription').value || '-';
        document.getElementById('reviewContactPhone').textContent = document.getElementById('contactPhone').value || '-';
        document.getElementById('reviewContactEmail').textContent = document.getElementById('contactEmail').value || '-';
        document.getElementById('reviewFullAddress').textContent = document.getElementById('fullAddress').value || '-';
        document.getElementById('reviewBarangay').textContent = document.getElementById('barangay').options[document.getElementById('barangay').selectedIndex].text || '-';
        document.getElementById('reviewBusinessHours').textContent = document.getElementById('businessHours').options[document.getElementById('businessHours').selectedIndex].text || '-';
        
        // Get selected materials
        const materialCheckboxes = document.querySelectorAll('input[name="materials"]:checked');
        const selectedMaterials = Array.from(materialCheckboxes).map(cb => cb.nextElementSibling.textContent).join(', ') || 'None selected';
        document.getElementById('reviewMaterials').textContent = selectedMaterials;
        
        // Pricing info
        const pricingMethodText = document.getElementById('pricingMethod').options[document.getElementById('pricingMethod').selectedIndex].text;
        document.getElementById('reviewPricingMethod').textContent = pricingMethodText;
        
        if (pricingMethod.value === 'fixed') {
          document.getElementById('reviewFixedPriceContainer').style.display = 'block';
          document.getElementById('reviewFixedPrice').textContent = '₱' + document.getElementById('fixedPrice').value;
        } else {
          document.getElementById('reviewFixedPriceContainer').style.display = 'none';
        }
        
        document.getElementById('reviewSpecialRequirements').textContent = document.getElementById('specialRequirements').value || '-';
        
        // Switch tabs
        materialsTab.style.display = 'none';
        reviewTab.style.display = 'block';
        progressBar.style.width = '100%';
        step2.classList.remove('active');
        step3.classList.add('active');
      });
      
      // Back to Shop Details tab
      backToShopDetails.addEventListener('click', function() {
        materialsTab.style.display = 'none';
        shopDetailsTab.style.display = 'block';
        progressBar.style.width = '33.33%';
        step2.classList.remove('active');
        step1.classList.add('active');
      });
      
      // Back to Materials tab
      backToMaterials.addEventListener('click', function() {
        reviewTab.style.display = 'none';
        materialsTab.style.display = 'block';
        progressBar.style.width = '66.66%';
        step3.classList.remove('active');
        step2.classList.add('active');
      });
      
      // Back to Landing page
      backToLanding.addEventListener('click', function() {
        window.location.href = '../Landing Page/index.php';
      });
      
      // Launch Shop
      launchShop.addEventListener('click', function() {
        if (document.getElementById('agreeTerms').checked) {
          alert('Your shop has been successfully created!');
          // Here you would typically submit the form to your backend
          // window.location.href = 'shop_dashboard.html';
        } else {
          alert('Please agree to the Terms & Conditions before launching your shop.');
        }
      });
      
      // Pricing method change handler
      pricingMethod.addEventListener('change', function() {
        if (this.value === 'fixed') {
          fixedPriceContainer.style.display = 'block';
        } else {
          fixedPriceContainer.style.display = 'none';
        }
      });
      
      // Initialize first step as active
      step1.classList.add('active');
    });
  </script>
  <script src="./greeting.js" defer></script>
</body>
</html>