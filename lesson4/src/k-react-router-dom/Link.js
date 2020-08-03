import React, {Component} from "react";
import {RouterContext} from "./Context";

export default class Link extends Component {
  static contextType = RouterContext;
  handleClick = event => {
    event.preventDefault();
    // 事件做跳转
    this.context.history.push(this.props.to);
  };
  render() {
    const {to, children, ...restProps} = this.props;
    return (
      <a href={to} {...restProps} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
