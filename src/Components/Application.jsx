import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile/UserProfile";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import EventCalendar from "./EventCalendar/EventCalendar";
import PasswordReset from "./PasswordReset";
// import { UserContext } from "../providers/UserProvider";

function Application() {
  //   const user = useContext(UserContext);
  const user = true;
  return user ? (
    <Router>
      <Switch>
        <Route exact path="/userProfile">
          <UserProfile />
        </Route>
        <Route exact path="/userDashboard">
          <UserDashboard />
        </Route>
        <Route exact path="/adminDashboard">
          <AdminDashboard />
        </Route>
        <Route exact path="/eventCalendar">
          <EventCalendar />
        </Route>
      </Switch>
    </Router>
  ) : (
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
