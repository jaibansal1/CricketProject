import { createContext, FC, useContext, useEffect, useState } from "react";
import { User, getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import app from "../Services/firebase";
// import { auth, generateUserDocument } from "../firebase";
// import { onAuthStateChanged } from "@firebase/auth";

interface AuthInterface {
  user: User | null,
  login: () => void,
  logout: () => void,
}
const auth = getAuth(app);

// Context is primarily used when some data needs to be accessible by many components at different nesting levels
// So we build one for authentication to pass auth state to many components down the tree
const AuthContext = createContext<AuthInterface>({ 
  user: null, login: () => {}, logout: () => {}
});

const AuthProvider: FC =({children}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
    return unsubscribe;
  }, [])
  
  const login = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  ) 
}

const useAuth = () => useContext(AuthContext); 
export {AuthProvider, useAuth};
