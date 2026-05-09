// ===========================================
// Tasty Bites - Menu JavaScript
// ===========================================

// JavaScript Object: menu data
const menu = {
  appetizers: [
    { name: "Spring Rolls", price: 15 },
    { name: "Garlic Bread", price: 10 },
    { name: "Chicken Wings", price: 20 },
    { name: "Soup of the Day", price: 12 }
  ],
  mainCourse: [
    { name: "Grilled Chicken", price: 45 },
    { name: "Beef Steak", price: 65 },
    { name: "Pasta Alfredo", price: 35 },
    { name: "Fish & Chips", price: 40 }
  ],
  dessert: [
    { name: "Chocolate Cake", price: 18 },
    { name: "Ice Cream", price: 12 },
    { name: "Cheesecake", price: 20 },
    { name: "Fruit Salad", price: 15 }
  ],
  drinks: [
    { name: "Fresh Juice", price: 10 },
    { name: "Soft Drink", price: 7 },
    { name: "Coffee", price: 12 },
    { name: "Tea", price: 8 }
  ]
};

// Cart array to store selected items
let cart = [];

// Function to display dishes for selected section
function showSection(section) {
  const dishes = menu[section];
  const container = document.getElementById("dishesContainer");
  container.innerHTML = ""; // clear previous dishes

  // Loop through dishes and create HTML dynamically
  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];

    // Create dish card using JavaScript DOM
    const card = document.createElement("div");
    card.className = "col-md-6";
    card.innerHTML = `
      <div class="dish-card">
        <div class="row align-items-center">
          <div class="col-6">
            <h4>${dish.name}</h4>
            <p class="dish-price">${dish.price} SAR</p>
          </div>
          <div class="col-6 text-end">
            <label>Quantity:</label>
            <select id="qty-${section}-${i}">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <br><br>
            <button class="btn btn-custom btn-sm" 
                    onclick="addToCart('${section}', ${i})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  }
}

// Function to add a dish to cart
function addToCart(section, index) {
  const dish = menu[section][index];
  const qtySelect = document.getElementById(`qty-${section}-${index}`);
  const quantity = parseInt(qtySelect.value);

  if (quantity === 0) {
    alert("Please select a quantity first!");
    return;
  }

  // Add item to cart
  cart.push({
    name: dish.name,
    price: dish.price,
    quantity: quantity,
    total: dish.price * quantity
  });

  // Update cart counter
  updateCartCount();
  alert(`Added ${quantity} x ${dish.name} to cart!`);
}

// Function to update cart count
function updateCartCount() {
  let totalItems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
  }
  document.getElementById("cartCount").innerText = totalItems;
}

// Function to print order summary
function printOrder() {
  const summaryDiv = document.getElementById("orderSummary");

  if (cart.length === 0) {
    summaryDiv.innerHTML = "<p style='text-align:center; color:#f21a05;'><strong>Your cart is empty!</strong></p>";
    return;
  }

  let total = 0;
  let html = `
    <h2 style="text-align:center;">Your Order</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>Dish</th>
          <th>Quantity</th>
          <th>Price (SAR)</th>
          <th>Subtotal (SAR)</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.total;
    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.total}</td>
      </tr>
    `;
  }

  html += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align:right;">Total:</td>
          <td>${total} SAR</td>
        </tr>
      </tfoot>
    </table>
  `;

  summaryDiv.innerHTML = html;
}

// JavaScript Event: when page loads, show appetizers by default
window.addEventListener("load", function() {
  showSection("appetizers");
});
