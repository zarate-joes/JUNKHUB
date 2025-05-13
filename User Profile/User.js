
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

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleBtn');

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('hidden');
    // Change arrow direction
    toggleBtn.innerHTML = sidebar.classList.contains('hidden') ? '&#8250;' : '&#8249;';
  });
});
