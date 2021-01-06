import React, {Component} from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {location} = context;
          const {path, children, component, render, computedMatch} = this.props;
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match; ///location.pathname === path;
          // match children(func, 节点) component render null
          // 不match children（func）
          const props = {
            ...context,
            match,
          };
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? children(props)
                : null}
            </RouterContext.Provider>
          );

          //return match ? React.createElement(component) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Route;
