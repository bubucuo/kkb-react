import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import _404Page from "./_404Page";

export default class ReactRouterPage extends Component {
  change = () => {
    this.forceUpdate();
  };
  render() {
    return (
      <div>
        <h3>ReactRouterPage</h3>
        <button onClick={this.change}>forceUpdate</button>
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Switch>
            <Route
              exact
              path="/"
              // component={HomePage}
              // children={ChildrenCmp}
              render={RenderCmp}
            />

            {/* 渲染component的时候会调用React.createElement，如果使用下面这种匿名函数的形式，每次都会生成一个新的匿名的函数，
          导致生成的组件的type总是不相同，这个时候会产生重复的卸载和挂载 */}
            {/* <Route path="/user" render={() => <UserPage />} /> */}
            <Route path="/user" component={UserPage} />
            <Route exact strict sensitive path="/login" component={LoginPage} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function ChildrenCmp(props) {
  console.log("ChildrenCmp", props); //sy-log
  return <h1>children </h1>;
}

function RenderCmp(props) {
  console.log("RenderCmp", props); //sy-log
  return <h1>render</h1>;
}
