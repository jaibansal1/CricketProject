import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "../Services/firebase";
// import { auth, generateUserDocument } from "../firebase";
// import { onAuthStateChanged } from "@firebase/auth";

// interface AuthInterface {
//   user: User | null,
//   login: () => void,
//   logout: () => void,
//   userInfo: any
// }

const auth = getAuth(app);

// Context is primarily used when some data needs to be accessible by many components at different nesting levels
// So we build one for authentication to pass auth state to many components down the tree
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  userInfo: null,
});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (accountType) => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
        console.log(JSON.stringify(response, null));
        const { userInfo } = response.user;
        const data = {
          id: userInfo.uid,
          email: userInfo.email,
          fullName: userInfo.displayName,
          photoURL: userInfo.photoURL,
          accountType,
        };
        const usersRef = db.collection("users");
        // usersRef.
      });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
