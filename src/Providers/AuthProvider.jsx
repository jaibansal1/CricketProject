import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { app, db } from "../Services/firebase";
// import { auth, generateUserDocument } from "../firebase";
// import { onAuthStateChanged } from "@firebase/auth";

const auth = getAuth(app);

// Context is primarily used when some data needs to be accessible by many components at different nesting levels
// So we build one for authentication to pass auth state to many components down the tree
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if (user) {
      //   const uid = user.uid;
      //   // const user = auth.currentUser;
      //   //   const userSnap = db.doc(`users/${user.uid}`).get();
      //   //   setUserData(userSnap.data());
      // } else {
      //   setCurrentUser(null);
      // }
      console.log(user);
      setCurrentUser(user);

      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const adminRef = collection(db, "admin");

  const register = (firstName, lastName, email, password, accountType) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setCurrentUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setCurrentUser(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    // try {
    //   await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
    //     console.log(JSON.stringify(response, null));
    //     // const { userInfo } = response.user;
    //     // const data = {
    //     //   id: userInfo.uid,
    //     //   email: userInfo.email,
    //     //   fullName: userInfo.displayName,
    //     //   photoURL: userInfo.photoURL,
    //     //   accountType,
    //     // };
    //     // const usersRef = collection(db, "users");
    //     // usersRef
    //     //   .doc(userInfo.uid)
    //     //   .set(data)
    //     //   .then((res) => console.log(res))
    //     //   .catch((err) => console.log(err));
    //   });
    //   // if (accountType === "admin") {
    //   //   adminRef
    //   //     .doc()
    //   //     .set({
    //   //       id: userInfo.uid,
    //   //       email: userInfo.email,
    //   //       fullName: userInfo.displayName,
    //   //       photoURL: userInfo.photoURL,
    //   //       accountType,
    //   //     })
    //   //     .catch((err) => console.log(err));
    //   // }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const logOut = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
      .then((res) => {
        // Password reset email sent!
        console.log(res);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const value = {
    currentUser,
    logIn,
    register,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth, auth };
