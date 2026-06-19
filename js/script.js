console.log("Tekano Eats loaded");


let cart = JSON.parse(localStorage.getItem("cart")) || {};

// ================= CART =================

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = { price: price, qty: 1 };
  }

  saveCart();
  updateCartCount();
}

function updateCartCount() {
  let count = 0;

  for (let item in cart) {
    count += cart[item].qty;
  }

  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

function goToCart() {
  window.location.href = "cart.html";
}

function goToMenu() {
    window.location.href = "products.html"; // or index.html if menu is there
  }

  function loadCartPage() {
    const list = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
  
    if (!list || !totalEl) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
    list.innerHTML = "";
  
    let total = 0;
  
    for (let item in cart) {
      let row = document.createElement("li");
  
      row.innerHTML = `
        <span>${item}</span>
        
        <div>
          <button onclick="decreaseItem('${item}')">-</button>
          <span> ${cart[item].qty} </span>
          <button onclick="increaseItem('${item}')">+</button>
        </div>
  
        <strong>R${cart[item].price * cart[item].qty}</strong>
      `;
  
      list.appendChild(row);
  
      total += cart[item].price * cart[item].qty;
    }
  
    totalEl.textContent = total;
  }

function clearCart() {
  cart = {};
  saveCart();
  updateCartCount();

  const list = document.getElementById("cartItems");
  if (list) list.innerHTML = "";

  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = "0";
}

function checkout() {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Order placed successfully!");
  clearCart();
}

function increaseItem(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
    cart[name].qty++;
  
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
  }
  
  function decreaseItem(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
    cart[name].qty--;
  
    if (cart[name].qty <= 0) {
      delete cart[name];
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
  }

// ================= SAFE PAGE LOAD =================

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  if (document.getElementById("cartItems")) {
    loadCartPage();
  }

  // DARK MODE SAFE
  const darkBtn = document.getElementById("darkModeBtn");
  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // ENQUIRY FORM SAFE
  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you, enquiry received!");
      this.reset();
    });
  }

  // CONTACT FORM SAFE
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Message sent successfully!");
      this.reset();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cartItems")) {
      loadCartPage();
    }
  });

  function placeOrder() {
    const name = document.getElementById("customerName").value;
    const address = document.getElementById("customerAddress").value;
    const phone = document.getElementById("customerPhone").value;
  
    if (!name || !address || !phone) {
      alert("Please fill in all details!");
      return;
    }
  
    // Save order
    localStorage.setItem("orderName", name);
    localStorage.setItem("orderTotal", calculateTotal());
  
    // Clear cart
    localStorage.removeItem("cart");
  
    // Redirect
    window.location.href = "success.html";
  }
  
  function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let total = 0;
  
    for (let item in cart) {
      total += cart[item].price * cart[item].qty;
    }
  
    return total;
  }