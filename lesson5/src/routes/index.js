import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import _404Page from "../pages/_404Page";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import BottomNav from "../components/BottomNav";

export const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage
  },
  {
    path: "/user",
    component: UserPage
    // auth: PrivateRoute
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    component: _404Page
  }
];

export default function Routes(props) {
  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户中心</Link>
      <Link to="/login">登录</Link>

      <BottomNav />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        {/* <Route path="/user" component={UserPage} /> */}
        <PrivateRoute path="/user" component={UserPage} />
        <Route component={_404Page} />
      </Switch>
    </Router>
  );
}
