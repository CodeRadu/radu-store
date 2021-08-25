import React from "react";
import Signup from "./auth/Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./store/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
import GuestRoute from "./auth/GuestRoute";
import AdminRoute from "./auth/AdminRoute";
import Login from "./auth/Login";
import Admin from "./store/Admin";
// import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <GuestRoute path="/login" component={Login} />
          <AdminRoute path="/admin" component={Admin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
