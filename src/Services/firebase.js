import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5wQgqLLDBfeHMua4DU1sGgOCotAVqFFA",
  authDomain: "cricket-project-69765.firebaseapp.com",
  projectId: "cricket-project-69765",
  storageBucket: "cricket-project-69765.appspot.com",
  messagingSenderId: "873352753867",
  appId: "1:873352753867:web:0dbeea3271126c8cc0e14e",
  measurementId: "G-F6X3JZRY4R",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const register = async (name, email, password, accountType) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const docRef = await addDoc(collection(db, accountType), {
      uid: user.uid,
      name,
      email,
      accountType,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
    var errorCode = err.code;
    var errorMessage = err.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } 
    else if (errorCode == 'auth/invalid-email') {
      alert('Please enter a valid email address.');
    }
    else if (errorCode == 'auth/email-already-in-use') {
      alert('Account already exists with this email.');
    }
    else {
      alert(errorMessage);
    }
    console.log(err);
    
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signIn,
  signInWithEmailAndPassword,
  register,
  resetPassword,
  logout,
};
