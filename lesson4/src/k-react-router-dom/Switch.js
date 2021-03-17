import React, {Component} from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = this.props.location || context.location;
          const {children} = this.props;
          let match, // 有没有找到匹配的
            element; // 匹配的元素
          //  todo 遍历子元素，匹配
          React.Children.forEach(this.props.children, (child) => {
            if (match == null && React.isValidElement(child)) {
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
