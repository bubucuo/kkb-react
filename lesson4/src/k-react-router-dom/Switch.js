import React, {Component} from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {location} = context;
          let match; //标记匹配
          let element; // 记录匹配到的节点

          // todo 匹配
          React.Children.forEach(this.props.children, (child) => {
            if (match == null) {
              element = child;
              match = child.props.path
                ? matchPath(location.pathname, child.props)
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
