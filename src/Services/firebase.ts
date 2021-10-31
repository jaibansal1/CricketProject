import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
let app: FirebaseApp;
const firebaseConfig = {
  apiKey: "AIzaSyDA5rpsXgLJkNyRyttYmH4SMiB1CKdO1SA",
  authDomain: "cricket-project-ce958.firebaseapp.com",
  projectId: "cricket-project-ce958",
  storageBucket: "cricket-project-ce958.appspot.com",
  messagingSenderId: "138097516988",
  appId: "1:138097516988:web:ed34df205649f1514ccbb9",
  measurementId: "G-SMRPYEHDWP",
};
// Initialize Firebase
if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig);
}
const db = getFirestore();

export {app, db};
// export const auth = getAuth();

// const provider = new GoogleAuthProvider();
// // export const signInWithGoogle = () => {
// //   signInWithPopup(provider);
// // };

// const getUserDocument = async (uid) => {
//   if (!uid) return null;
//   try {
//     const userDocument = await getDoc(doc(firestore, `users/${uid}`));
//     return {
//       uid,
//       ...userDocument.data(),
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = doc(firestore, `users/${user.uid}`);
//   console.log(userRef);
//   const snapshot = await getDoc(userRef);
//   // try {
//   //   snapshot = await getDoc(userRef);
//   // } catch (error) {
//   //   console.error(error);
//   // }

//   if (!snapshot.exists) {
//     const { email, displayName, photoURL } = user;
//     try {
//       await setDoc(userRef, {
//         displayName,
//         email,
//         photoURL,
//         ...additionalData,
//       });
//       // userRef.set({
//       //   displayName,
//       //   email,
//       //   photoURL,
//       //   ...additionalData
//       // });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// // const signInWithEmailAndPassword = async (email, password) => {
// //   try {
// //     await auth.signInWithEmailAndPassword(email, password);
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };

// // const sendPasswordResetEmail = async (email) => {
// //   try {
// //     await auth.sendPasswordResetEmail(email);
// //     alert("Password reset link sent!");
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };

// // const logout = () => {
// //   auth.signOut();
// // };
