// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA5rpsXgLJkNyRyttYmH4SMiB1CKdO1SA",
  authDomain: "cricket-project-ce958.firebaseapp.com",
  projectId: "cricket-project-ce958",
  storageBucket: "cricket-project-ce958.appspot.com",
  messagingSenderId: "138097516988",
  appId: "1:138097516988:web:ed34df205649f1514ccbb9",
  measurementId: "G-SMRPYEHDWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);