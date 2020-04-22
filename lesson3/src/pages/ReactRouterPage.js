import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import _404Page from "./_404Page";

export default class ReactRouterPage extends Component {
  render() {
    return (
      <div>
        <h3>ReactRouterPage</h3>
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>

          {/* <Switch> */}
          <Route
            exact
            path="/"
            // component={HomePage}
            children={ChildrenCmp}
            // render={RenderCmp}
          />
          <Route path="/user" component={UserPage} />
          <Route strict exact sensitive path="/login" component={LoginPage} />
          <Route component={_404Page} />
          {/* </Switch> */}
        </Router>
      </div>
    );
  }
}

function ChildrenCmp(props) {
  console.log("children", props); //sy-log
  return <h1>children</h1>;
}

function RenderCmp(props) {
  console.log("render", props); //sy-log
  return <h1>render</h1>;
}
