// Optional: Placeholder chart using Chart.js
window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('dashboardChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Revenue',
            data: [1000, 2300, 1800, 2500, 2700],
            borderColor: '#00c4b4',
            fill: false
          },
          {
            label: 'Users',
            data: [150, 300, 280, 350, 400],
            borderColor: '#1d4ed8',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
});
