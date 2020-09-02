import React, {Component} from "react";
import {RouterContext} from "./Context";
import matchPath from "./matchPath";
//
export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {location} = context;
          let match = undefined; //匹配的match
          let element = undefined; //匹配的元素

          // todo 遍历children，给匹配赋值 done
          // 找到第一个匹配的Route或者Redirect
          // 这里写React.Children就是因为我不想判断children的数据类型，课下去官网看下React.Children的用法
          React.Children.forEach(this.props.children, child => {
            // child 是Route或者Redirect
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
