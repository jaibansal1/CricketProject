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
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const adminRef = db.collection("admin");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userSnap = await db.doc(`users/${user.uid}`).get();
        setUserData(userSnap.data());
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
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
        usersRef
          .doc(userInfo.uid)
          .set(data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
      if (accountType === "admin") {
        adminRef
          .doc()
          .set({
            id: userInfo.uid,
            email: userInfo.email,
            fullName: userInfo.displayName,
            photoURL: userInfo.photoURL,
            accountType,
          })
          .catch((err) => console.log(err));
      }
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
    <AuthContext.Provider value={{ user, userData, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
