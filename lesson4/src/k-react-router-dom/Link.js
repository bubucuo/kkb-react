import React, {Component} from "react";
import {RouterContext} from "./Context";

export default class Link extends Component {
  static contextType = RouterContext;
  handleClick = e => {
    e.preventDefault();
    // 手动跳转
    this.context.history.push(this.props.to);
  };
  render() {
    const {children, to, ...restProps} = this.props;
    return (
      <a href={to} {...restProps} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
