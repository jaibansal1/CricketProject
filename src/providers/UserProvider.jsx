import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";
import { onAuthStateChanged } from "@firebase/auth";
export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
    onAuthStateChanged(auth, async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
