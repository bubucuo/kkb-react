import React, {Component} from "react";
import {RouterContext} from "./Context";
import matchPath from "./matchPath";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location;
          const {path, children, component, render} = this.props;
          const match = this.props.computedMatch
            ? this.props.computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = {
            ...context,
            match
          };
          // match 渲染三者之一 children（function或者节点） component render或者null
          // 不match 渲染children（function）或者null
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
