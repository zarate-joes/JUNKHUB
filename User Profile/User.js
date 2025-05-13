document.addEventListener('DOMContentLoaded', () => {
  const orderRows = document.querySelectorAll('.order-row');
  const searchInput = document.getElementById('order-search');
  const noResult = document.getElementById('no-result');

  // Toggle order details on click
  orderRows.forEach(row => {
    row.addEventListener('click', () => {
      const details = row.nextElementSibling;
      if (details && details.classList.contains('order-details')) {
        details.classList.toggle('hidden');
      }
    });
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase();
      let matchFound = false;

      orderRows.forEach(row => {
        const orderId = row.dataset.orderId.toLowerCase();
        const itemName = row.dataset.item.toLowerCase();

        const match = orderId.includes(keyword) || itemName.includes(keyword);
        row.style.display = match ? '' : 'none';
        if (row.nextElementSibling && row.nextElementSibling.classList.contains('order-details')) {
          row.nextElementSibling.style.display = match ? '' : 'none';
        }

        if (match) matchFound = true;
      });

      noResult.classList.toggle('hidden', matchFound);
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('input[type="text"][value="FirstName"]').value = 'Juan';
  document.querySelector('input[type="text"][value="LastName"]').value = 'Dela Cruz';
  document.querySelector('input[type="email"]').value = 'juan.delacruz@mail.com';
  const phoneInput = document.createElement('input');
  phoneInput.type = 'text';
  phoneInput.value = '0970586747';
 
});

function navigateTo(sectionId) {
  const sections = ['profile-section', 'address-section', 'orders-section', 'wishlist-section'];

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) section.classList.add('hidden');
  });

  if (sectionId === 'orders') {
    document.getElementById('orders-section').classList.remove('hidden');
  } else if (sectionId === 'wishlist') {
    document.getElementById('wishlist-section').classList.remove('hidden');
  } else if (sectionId === 'signout') {
    window.location.href = 'login.html';
  }
}


function signOut() {
  window.location.href = "../Landing Page/index.html";
}
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleBtn');

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('hidden');
    // Change arrow direction
    toggleBtn.innerHTML = sidebar.classList.contains('hidden') ? '&#8250;' : '&#8249;';
  
  });
  });

