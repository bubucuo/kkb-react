import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import UserPage from "./UserPage";
import _404Page from "./_404Page";

export default class ReactRouterPage extends Component {
  render() {
    return (
      <div>
        <h3>ReactRouterPage</h3>

        <Router>
          <Link to="/">首页</Link>
          <Link to="/login">登录</Link>
          <Link to="/user">用户中心</Link>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/user" component={UserPage} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      </div>
    );
  }
}
