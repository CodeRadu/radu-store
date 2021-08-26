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
import AdminViewProduct from "./store/AdminViewProduct";
import AdminEditProduct from "./store/AdminEditProduct";
import ViewProduct from "./store/ViewProduct";
// import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <GuestRoute path="/signup" component={Signup} />
        <GuestRoute path="/login" component={Login} />
        <AdminRoute path="/admin" exact component={Admin} />
        <AdminRoute
          path="/admin/products/:id"
          exact
          component={AdminViewProduct}
        />
        <AdminRoute
          path="/admin/products/edit/:id"
          exact
          component={AdminEditProduct}
        />
        <PrivateRoute path="/products/:id" exact component={ViewProduct} />
      </Switch>
    </Router>
  );
}

export default App;
