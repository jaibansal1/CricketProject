import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
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
