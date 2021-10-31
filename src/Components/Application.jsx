import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import UserProfile from "./UserProfile/UserProfile";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import EventCalendar from "./EventCalendar/EventCalendar";
import { useAuth } from "../Providers/AuthProvider";

function Application() {
  // const { user } = useAuth();
  const user = true;
  return user ? (
    <Router>
      <Switch>
        <Route exact path="/">
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
        <Route exact path="/">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
  // <div>
  //   <p>{JSON.stringify(user, null, 5)}</p>
  //   <div>
  //     <button onClick={login}>Login</button>
  //     <button onClick={logout}>Logout</button>
  //   </div>
  // </div>
}

export default Application;
