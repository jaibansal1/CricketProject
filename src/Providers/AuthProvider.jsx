// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   User,
//   getAuth,
//   signOut,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import {
//   getFirestore,
//   collection,
//   getDoc,
//   getDocs,
//   doc,
//   setDoc,
// } from "firebase/firestore";
// import { app, db } from "../Services/firebase";
// // import { auth, generateUserDocument } from "../firebase";
// // import { onAuthStateChanged } from "@firebase/auth";

// // Context is primarily used when some data needs to be accessible by many components at different nesting levels
// // So we build one for authentication to pass auth state to many components down the tree
// export const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);
// export const auth = getAuth(app);
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState();
//   const [loading, setLoading] = useState(true);

//   // const adminRef = collection(db, "admin");

//   const register = (firstName, lastName, email, password, accountType) => {
//     return createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(user);
//         setCurrentUser(user);
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//       });
//   };
//   const logIn = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       // Signed in
//       const user = userCredential.user;
//       console.log(user);
//       setCurrentUser(user);
//     } catch (error) {
//       console.log(error);
//     }
//     // try {
//     //   await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
//     //     console.log(JSON.stringify(response, null));
//     //     // const { userInfo } = response.user;
//     //     // const data = {
//     //     //   id: userInfo.uid,
//     //     //   email: userInfo.email,
//     //     //   fullName: userInfo.displayName,
//     //     //   photoURL: userInfo.photoURL,
//     //     //   accountType,
//     //     // };
//     //     // const usersRef = collection(db, "users");
//     //     // usersRef
//     //     //   .doc(userInfo.uid)
//     //     //   .set(data)
//     //     //   .then((res) => console.log(res))
//     //     //   .catch((err) => console.log(err));
//     //   });
//     //   // if (accountType === "admin") {
//     //   //   adminRef
//     //   //     .doc()
//     //   //     .set({
//     //   //       id: userInfo.uid,
//     //   //       email: userInfo.email,
//     //   //       fullName: userInfo.displayName,
//     //   //       photoURL: userInfo.photoURL,
//     //   //       accountType,
//     //   //     })
//     //   //     .catch((err) => console.log(err));
//     //   // }
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   };
//   const logOut = async () => {
//     return signOut(auth);
//   };

//   const resetPassword = async (email) => {
//     try {
//       const res = await sendPasswordResetEmail(auth, email);
//       console.log(res);
//     } catch (error) {
//       return console.log(error);
//     }
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         // const userSnap = doc(db, `players/${user.uid}`).get();
//         // setUserData(userSnap.data());
//       } else {
//         setCurrentUser(null);
//         setLoading(false);
//       }
//       console.log(user);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     logIn,
//     register,
//     logOut,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
