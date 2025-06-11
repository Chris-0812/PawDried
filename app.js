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
