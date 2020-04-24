import React, {Component, isValidElement} from "react";
import {RouterContext} from "./Context";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          // 是否匹配，匹配适合返回的元素
          let match, element;
          const location = this.props.location || context.location;
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const path = child.props.path;
              match = path
                ? matchPath(location.pathname, {...child.props, path})
                : context.match;
            }
          });
          return match
            ? React.cloneElement(element, {location, computedMatch: match})
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
