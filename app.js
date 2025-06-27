// app.js
import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const currentPage = window.location.pathname;

// 🔐 Login page logic
if (currentPage.includes('login.html')) {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          window.location.href = 'home.html';
        })
        .catch((error) => {
          alert('Login failed: ' + error.message);
        });
    });
  }
}

// 🏠 Home page logic
if (currentPage.includes('home.html')) {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.href = 'login.html';
      });
    });
  }

  // ✅ Auth state check
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

