import React, {Component} from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {location} = context;

          const {children, component, render, path, computedMatch} = this.props;
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match; //location.pathname === path;
          const props = {...context, match};

          // match
          // 匹配 children, component, render ， null
          // 不匹配 children(function)
          //return match ? React.createElement(component) : null;
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
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Route;
