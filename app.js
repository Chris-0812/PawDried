// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAushJhRtp7Y6M-uS2UxL3miqG0ksuTWQY",
  authDomain: "pawdried-462702.firebaseapp.com",
  projectId: "pawdried-462702",
  storageBucket: "pawdried-462702.appspot.com", // ✅ fixed this!
  messagingSenderId: "603522630065",
  appId: "1:603522630065:web:0961f13e24ca3780a77d90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Detect current page
const currentPage = window.location.pathname;

// 🔐 Login logic
if (currentPage.includes('login.html')) {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Login successful');
          window.location.href = 'home.html';
        })
        .catch((error) => {
          alert('Login failed: ' + error.message);
        });
    });
  }
}

// 🏠 Home logic
if (currentPage.includes('home.html')) {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.href = 'login.html';
      });
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    }
  });
}


// 🔗 Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbx5qru2NLKNXNxm98UPV24c3TUZI3BetI4-_3ObExtCBsdobc_E3xAOxqhfEHs8-zoh/exec";

// 📌 DOM elements
const datalist = document.getElementById('productList');
const input = document.getElementById('productID');
const unitInput = document.getElementById('unit');

let productMap = {}; // name -> unit

// Fetch product list and populate datalist
fetch(API_URL + '?type=product')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const name = product['Product Name'];
      const id = product['Product ID'];
      const unit = product['Unit'];
      
      const option = document.createElement('option');
      option.value = product['Product Name']; // <-- Adjust to match your sheet
      datalist.appendChild(option);

      // Save unit by product name
      productMap[name] = { id, unit }; // <-- Match your sheet headers
    });
  })
  .catch(err => {
    console.error("Failed to fetch product list:", err);
  });

// Auto-fill unit when a product is selected
document.getElementById('productID').addEventListener('change', function () {
  const selected = productMap[this.value];
  document.getElementById('unit').value = selected ? selected.unit : '';
});

// ➕ Add row to Google Sheet
const form = document.getElementById('costForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('productID').value;
  const selected = productMap[name] || {};
  
  const entry = {
    date: document.getElementById('date').value,
    productId: selected.id || name, // fallback to name if mapping fails
    quantity: parseFloat(document.getElementById('quantity').value),
    amount: parseFloat(document.getElementById('amount').value)
  };

  console.log(entry);

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: 'Hello Google Apps Script!' })
  })
  .then(res => res.json())
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error:', err));




