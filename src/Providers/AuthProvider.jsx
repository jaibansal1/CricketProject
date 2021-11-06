import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection } from "firebase/firestore";
import { app, db } from "../Services/firebase";

const auth = getAuth(app);

// Context is primarily used when some data needs to be accessible by many components at different nesting levels
// So we build one for authentication to pass auth state to many components down the tree
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = (firstName, lastName, email, password, accountType) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => console.log(error));
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => console.log(error));
  };

  const logOut = () => {
    return signOut(auth)
      .then((res) => {
        // Sign-out successful.
        console.log(res);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
      .then((res) => {
        // Password reset email sent!
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
        console.log(JSON.stringify(response, null));
        const { userInfo } = response.user;
        const data = {
          id: userInfo.uid,
          email: userInfo.email,
          fullName: userInfo.displayName,
          photoURL: userInfo.photoURL,
        };
        const usersRef = collection(db, "users");
        usersRef
          .doc(userInfo.uid)
          .set(data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logIn,
        register,
        logOut,
        resetPassword,
        googleSignIn,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useAuth, auth };
