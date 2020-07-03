import React, {Component} from "react";
import {matchPath} from "react-router";
import {RouterContext} from "./Context";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {location} = context;
          let match; //找到匹配的元素，match设置为true
          let element; // 匹配的元素

          const {children} = this.props;
          // todo 查找 遍历
          React.Children.forEach(children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const {path} = child.props;
              match = path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });

          return match
            ? React.cloneElement(element, {
                computedMatch: match
              })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
