import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAushJhRtp7Y6M-uS2UxL3miqG0ksuTWQY",
  authDomain: "pawdried-462702.firebaseapp.com",
  projectId: "pawdried-462702",
  storageBucket: "pawdried-462702.firebasestorage.app",
  messagingSenderId: "603522630065",
  appId: "1:603522630065:web:0961f13e24ca3780a77d90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth (you can export other Firebase services too)
export { auth };
