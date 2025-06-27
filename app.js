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


// Read and Update Google Sheet
const API_URL = 'https://script.google.com/macros/s/AKfycbzsRXSmIv-I0BamrueDVnn2gBuvxBq4Uf_nlZB5P487k2ezDgmJ0LgSD2XDciYPYH7k/exec';

// 🔽 Read data
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    console.log('Fetched records:', data);
    // display on page
  });


// 🔼 Add data
function addRow() {
  const entry = {
    date: document.getElementById('date').value,
    productId: document.getElementById('productID').value,
    quantity: parseFloat(document.getElementById('quantity').value),
    unit: document.getElementById('unit').value,
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
  });
}

