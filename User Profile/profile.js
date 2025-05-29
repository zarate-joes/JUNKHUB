document.addEventListener('DOMContentLoaded', function() {
  // Set the first section as active by default
  showSection('manage-account');
  
  // Add active class to the first sidebar item
  document.querySelector('.sidebar div:first-child').classList.add('active');
});

function showSection(sectionId) {
  // Hide all content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active-section');
  });
  
  // Remove active class from all sidebar items
  document.querySelectorAll('.sidebar div').forEach(item => {
    item.classList.remove('active');
  });
  
  // Show the selected section
  document.getElementById(sectionId).classList.add('active-section');
  
  // Add active class to the clicked sidebar item
  const clickedItem = document.querySelector(`.sidebar div[onclick="showSection('${sectionId}')"]`);
  if (clickedItem) {
    clickedItem.classList.add('active');
  }
  
  // Scroll to top of the main display
  document.querySelector('.main-display').scrollTop = 0;
}

// Additional interactive functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Sample function for changing profile picture
document.querySelector('.change-pic-btn').addEventListener('click', function() {
  alert('Feature coming soon! You will be able to upload a new profile picture.');
});

// Sample function for editing account details
document.querySelector('.edit-btn').addEventListener('click', function() {
  alert('Edit mode activated! All fields will become editable.');
});