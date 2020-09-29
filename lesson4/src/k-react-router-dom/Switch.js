import React, {Component} from "react";
import {RouterContext} from "./Context";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          let match; //判断是否匹配
          let element; // 如果匹配，赋值element
          // todo 遍历子节点 children
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              match = child.props.path
                ? matchPath(context.location.pathname, child.props)
                : context.match;
            }
          });

          return match
            ? React.cloneElement(element, {computedMatch: match})
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
