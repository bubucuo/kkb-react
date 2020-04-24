import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {RouterContext} from "./Context";
import Router from "./Router";

export default class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
