import React, {Component} from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = context.location;
          const {path, children, component, render, computedMatch} = this.props;
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match; //path == location.pathname;
          const routerProps = {...context, match};
          // return match ? React.createElement(component) : null;
          // match children > component > render > null
          // 不match children(function) > null
          return (
            <RouterContext.Provider value={routerProps}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(routerProps)
                    : children
                  : component
                  ? React.createElement(component, routerProps)
                  : render
                  ? render(routerProps)
                  : null
                : typeof children === "function"
                ? children(routerProps)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

/* <Context.Provider value={{x: 1}}>
  <Context.Provider value={{y: 2}}>
    <A />
    <Context.Provider value={{z: 3}}></Context.Provider>
  </Context.Provider>
</Context.Provider>; */
