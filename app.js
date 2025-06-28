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
      const option = document.createElement('option');
      option.value = product['Product Name']; // <-- Adjust to match your sheet
      datalist.appendChild(option);

      // Save unit by product name
      productMap[product['Product Name']] = product['Unit']; // <-- Match your sheet headers
    });
  })
  .catch(err => {
    console.error("Failed to fetch product list:", err);
  });

// Auto-fill unit when a product is selected
input.addEventListener('change', () => {
  const selectedProduct = input.value;
  unitInput.value = productMap[selectedProduct] || '';
});


// ➕ Add row to Google Sheet
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const entry = {
    date: document.getElementById('date').value,
    productId: document.getElementById('productID').value,
    quantity: parseFloat(document.getElementById('quantity').value),
    amount: parseFloat(document.getElementById('amount').value)
  };

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log("Submitted:", data);
    alert("Entry submitted successfully!");
    form.reset(); // optional: clears the form
  })
  .catch(err => {
    console.error("Submit failed:", err);
    alert("Failed to submit data");
  });
});



