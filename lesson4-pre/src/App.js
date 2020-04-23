import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
import PrivateRoute from "./pages/PrivateRoute";

export default function App(props) {
  return (
    <div>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">Product</Link>

        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/product/:id" component={Product} />

          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

function Product({match}) {
  console.log("match", match); //sy-log
  const {id} = match.params;
  return (
    <div>
      <h1>Product-{id}</h1>
      <Link to={match.url + "/detail"}>detail</Link>
      <Route path={match.url + "/detail"} component={Detail} />
    </div>
  );
}

function Detail() {
  return (
    <div>
      <h1>Detail</h1>
    </div>
  );
}
