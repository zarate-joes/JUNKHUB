function showSection(section) {
  const sections = ['dashboard', 'orders', 'reports', 'users', 'analytics']; // Added 'analytics'
  sections.forEach(id => {
    document.getElementById(`${id}-section`).classList.add('hidden');
  });
  document.getElementById(`${section}-section`).classList.remove('hidden');
}

function signOut() {
  window.location.href = "../Landing Page/index.html";
}
const userOrders = [
  {
    id: 1,
    user: 'John Doe',
    items: ['Burger', 'Fries', 'Soda'],
    total: 12.99,
    status: 'Pending'
  },
  {
    id: 2,
    user: 'Eliza Smith',
    items: ['Pizza', 'Lemonade'],
    total: 15.50,
    status: 'Preparing'
  }
];

// Render orders to admin view
function renderAdminOrders() {
  const container = document.getElementById('admin-orders-container');
  container.innerHTML = ''; // Clear previous

  userOrders.forEach(order => {
    const orderCard = document.createElement('div');
    orderCard.className = 'bg-white shadow p-4 rounded-md border border-gray-200';

    orderCard.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <div>
          <h3 class="font-semibold text-lg text-gray-800">Order #${order.id}</h3>
          <p class="text-sm text-gray-500">User: ${order.user}</p>
        </div>
        <select onchange="updateOrderStatus(${order.id}, this.value)" class="text-sm px-2 py-1 border rounded">
          <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
          <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </div>
      <ul class="text-gray-700 text-sm mb-2">
        ${order.items.map(item => `<li>• ${item}</li>`).join('')}
      </ul>
      <div class="flex justify-between items-center">
        <span class="font-bold text-gray-800">Total: $${order.total.toFixed(2)}</span>
        <button onclick="deleteOrder(${order.id})" class="text-red-500 hover:underline text-sm">Cancel Order</button>
      </div>
    `;

    container.appendChild(orderCard);
  });
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
  const order = userOrders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    renderAdminOrders();
  }
}

// Delete order
function deleteOrder(orderId) {
  const index = userOrders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    if (confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
      userOrders.splice(index, 1);
      renderAdminOrders();
    }
  }
}

// Load orders on page load
document.addEventListener('DOMContentLoaded', () => {
  renderAdminOrders();
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('analyticsChart').getContext('2d');

  const analyticsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Page Views',
          data: [4100, 3900, 4800, 5100, 4700, 4500, 4340],
          fill: true,
          backgroundColor: 'rgba(250, 204, 21, 0.2)', // yellow-400 with transparency
          borderColor: '#FACC15', // Tailwind yellow-400
          borderWidth: 3,
          pointBackgroundColor: '#FACC15',
          tension: 0.4 // smooth curves
        },
        {
          label: 'Product Sales',
          data: [1500, 1600, 1800, 1700, 1650, 1400, 1550],
          fill: true,
          backgroundColor: 'rgba(34, 197, 94, 0.2)', // green-500 with transparency
          borderColor: '#10B981', // Tailwind green-500
          borderWidth: 3,
          pointBackgroundColor: '#10B981',
          tension: 0.4
        },
        {
          label: 'Orders',
          data: [1200, 1100, 1300, 1400, 1350, 1200, 1250],
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue-500 with transparency
          borderColor: '#3B82F6', // Tailwind blue-500
          borderWidth: 3,
          pointBackgroundColor: '#3B82F6',
          tension: 0.4
        },
        {
          label: 'Users',
          data: [2500, 2300, 2400, 2550, 2650, 2500, 2700],
          fill: true,
          backgroundColor: 'rgba(239, 68, 68, 0.2)', // red-500 with transparency
          borderColor: '#EF4444', // Tailwind red-500
          borderWidth: 3,
          pointBackgroundColor: '#EF4444',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#374151', // text-gray-700
            font: {
              weight: 'bold'
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#6B7280' // text-gray-500
          },
          grid: {
            color: '#E5E7EB' // gray-200
          }
        },
        x: {
          ticks: {
            color: '#6B7280'
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
});
const reportData = [
  {
    user: "Juan Dela Cruz",
    material: "Plastic",
    weight: 4.5,
    quantity: 3,
    pricePerKg: 10,
    date: "2025-05-10"
  },
  {
    user: "Maria Santos",
    material: "Metal",
    weight: 3.2,
    quantity: 2,
    pricePerKg: 15,
    date: "2025-05-11"
  },
  {
    user: "Carlos Reyes",
    material: "Glass",
    weight: 2.0,
    quantity: 1,
    pricePerKg: 8,
    date: "2025-05-13"
  },
  {
    user: "Juan Dela Cruz",
    material: "Glass",
    weight: 2.5,
    quantity: 2,
    pricePerKg: 8,
    date: "2025-05-13"
  }
];

function generateReport() {
  const start = document.getElementById('start-date').value;
  const end = document.getElementById('end-date').value;
  const tbody = document.querySelector('#report-table tbody');
  tbody.innerHTML = '';

  const filtered = reportData.filter(entry => {
    if (!start || !end) return true;
    return entry.date >= start && entry.date <= end;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7">No records found for selected date range.</td></tr>';
    return;
  }

  let totalWeight = 0, totalQuantity = 0, totalPoints = 0, totalCash = 0;

  filtered.forEach(entry => {
    const points = entry.weight * 10;
    const total = entry.weight * entry.pricePerKg;

    totalWeight += entry.weight;
    totalQuantity += entry.quantity;
    totalPoints += points;
    totalCash += total;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border p-2">${entry.user}</td>
      <td class="border p-2">${entry.material}</td>
      <td class="border p-2">${entry.quantity}</td>
      <td class="border p-2">${entry.weight}</td>
      <td class="border p-2">${points}</td>
      <td class="border p-2">₱${total.toFixed(2)}</td>
      <td class="border p-2">${entry.date}</td>
    `;
    tbody.appendChild(row);
  });

  // Grand Total Row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td colspan="2" class="border p-2 font-bold text-right bg-gray-100">GRAND TOTAL</td>
    <td class="border p-2 font-bold bg-gray-100">${totalQuantity}</td>
    <td class="border p-2 font-bold bg-gray-100">${totalWeight.toFixed(2)}</td>
    <td class="border p-2 font-bold bg-gray-100">${totalPoints}</td>
    <td class="border p-2 font-bold bg-gray-100">₱${totalCash.toFixed(2)}</td>
    <td class="border p-2 bg-gray-100"></td>
  `;
  tbody.appendChild(totalRow);
}

function downloadCSV() {
  const filtered = reportData.filter(entry => {
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('end-date').value;
    if (!start || !end) return true;
    return entry.date >= start && entry.date <= end;
  });

  const rows = [
    ['User', 'Material', 'Quantity', 'Weight (kg)', 'Points', 'Total Cash (₱)', 'Date']
  ];

  let totalWeight = 0, totalQuantity = 0, totalPoints = 0, totalCash = 0;

  filtered.forEach(entry => {
    const points = entry.weight * 10;
    const total = entry.weight * entry.pricePerKg;
    rows.push([
      entry.user,
      entry.material,
      entry.quantity,
      entry.weight,
      points,
      total.toFixed(2),
      entry.date
    ]);

    totalWeight += entry.weight;
    totalQuantity += entry.quantity;
    totalPoints += points;
    totalCash += total;
  });

  rows.push([
    '', 'GRAND TOTAL',
    totalQuantity,
    totalWeight.toFixed(2),
    totalPoints,
    totalCash.toFixed(2),
    ''
  ]);

  const csvContent = "data:text/csv;charset=utf-8," +
    rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "junkhub_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", generateReport);

