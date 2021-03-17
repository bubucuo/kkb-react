import React, {Component} from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {location} = context;
          const {path, children, component, render} = this.props;
          const match = matchPath(location.pathname, this.props); // location.pathname === path;
          const props = {
            ...context,
            match,
          };
          //return match ? React.createElement(component) : null;
          // match ： children>component>render>null
          // 不match children （function）、 null
          return match
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
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Route;
