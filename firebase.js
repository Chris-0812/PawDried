import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Export auth (you can export other Firebase services too)
export { auth };
