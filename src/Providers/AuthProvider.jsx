import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";
import { onAuthStateChanged } from "@firebase/auth";

// Context is primarily used when some data needs to be accessible by many components at different nesting levels
// So we build one for authentication to pass auth state to many components down the tree
export const AuthContext = createContext({ user: null });

class AuthProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    onAuthStateChanged(auth, async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;

    return (
      <AuthContext.Provider value={user}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
