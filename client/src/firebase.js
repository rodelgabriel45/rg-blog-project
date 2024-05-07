// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "rg-blog-app.firebaseapp.com",
  projectId: "rg-blog-app",
  storageBucket: "rg-blog-app.appspot.com",
  messagingSenderId: "1085217028958",
  appId: "1:1085217028958:web:8c16da969d8eeff77c6dcf",
  measurementId: "G-GGLTDJPGVQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
