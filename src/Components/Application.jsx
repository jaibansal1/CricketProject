import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./UserProfile/UserProfile";
import PasswordReset from "./PasswordReset";
import { UserContext } from "../providers/UserProvider";

function Application() {
//   const user = useContext(UserContext);
    const user = true;
  return (
      user ?
        <ProfilePage />
        :
        <Router>
            <Switch>
                <Route exact path="/signUp">
                    <SignUp />
                </Route>
                <Route path="/passwordReset">
                    <PasswordReset />
                </Route>
                <Route path="/">
                    <SignIn />
                </Route>
            </Switch>
        </Router>
  );
}

export default Application;
