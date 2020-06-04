import React, {Component} from "react";
import {RouterContext} from "./RouterContext";
import matchPath from "./matchPath";

// /渲染与该地址匹配的第一个子节点 <Route> 或者 <Redirect>。
export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {location} = context;
          //children object | array
          let match, element;
          // match 记录是否找到匹配的元素
          //如果找到匹配的元素 记录在element
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const {path} = child.props;
              match = path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });
          return match ? React.cloneElement(element) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
