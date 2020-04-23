import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
import PrivateRoute from "./pages/PrivateRoute";

// todo 1. 保护UserPage， 如果没有登录，则跳转到LoginPage，在LoginPage登录之后，再跳转回来UserPage
// todo 2. 如果没有登录，直接进入LoginPage，登录完成之后进入首页
// todo 3. 如果登录，进入LoginPage，这个时候应该自动跳转到首页
export default function App(props) {
  return (
    <div>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>

        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}
