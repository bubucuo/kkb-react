import React, {Component} from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {location} = context;
          // 遍历children(route/redirect)
          let match, //标记匹配
            element; //标记匹配上的元素
          React.Children.forEach(this.props.children, (child) => {
            //todo 匹配
            if (match == null && React.isValidElement(child)) {
              element = child; //(route/redirect)
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
export default Switch;
