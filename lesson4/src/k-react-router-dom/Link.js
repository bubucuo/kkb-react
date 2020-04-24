import React, {Component} from "react";
import {RouterContext} from "./Context";

export default class Link extends Component {
  static contextType = RouterContext;
  handleClick = event => {
    const {history} = this.context;
    event.preventDefault();
    // 跳转
    history.push(this.props.to);
  };
  render() {
    const {to, children} = this.props;
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
