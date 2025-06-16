import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDRHItVnalODZss-h1Ls2uI06YVazgIfUQ",
  authDomain: "pawdried.firebaseapp.com",
  projectId: "pawdried",
  storageBucket: "pawdried.appspot.com",
  messagingSenderId: "172753598874",
  appId: "1:172753598874:web:d84b96219f510a61506223"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check which page we're on
const currentPage = window.location.pathname;

// Login page logic
if (currentPage.includes('login.html')) {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = 'home.html'; // Redirect to home page
      })
      .catch((error) => {
        alert('Login failed: ' + error.message);
      });
  });
}

// Home page logic
if (currentPage.includes('home.html')) {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.href = 'login.html'; // Redirect to login page
      });
    });
  }

  // Check authentication state
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html'; // Redirect if not logged in
    }
  });
}

// Read and Update Google Sheet
const API_URL = 'https://script.google.com/macros/s/AKfycbxebQHufvIgTnUZWDbC1ovfZq6aIwOrhM41jiwvsrPBQ9NDgbMCHKSY6L3vLScyw2gL/exec';

// 🔽 Read data
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    console.log("Fetched data:", data);
    // Display the data in your app
  });

// 🔼 Add data
function addRow() {
  const entry = {
    date: document.getElementById('date').value,
    category: document.getElementById('productID').value,
    item: document.getElementById('unit').value,
    quantity: document.getElementById('quantity').value,
    unit: document.getElementById('unit').value,
    amount: document.getElementById('amount').value
  };

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    console.log("Submitted:", data);
  });
}
