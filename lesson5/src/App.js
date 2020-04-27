import React, {Component} from "react";
import Routes from "./routes/";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import _404Page from "./pages/_404Page";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

export default function App(props) {
  return (
    <div className="app">
      <Routes />
      {/* <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/user" component={UserPage} />
          <Route component={_404Page} />
        </Switch>
      </Router> */}
    </div>
  );
}
