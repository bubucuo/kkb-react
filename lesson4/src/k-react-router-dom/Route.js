import React, {Component} from "react";
import {RouterContext} from "./Context";
import matchPath from "./matchPath";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {location} = context;

          const {children, component, render, path, computedMatch} = this.props;

          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = {
            ...context.match,
            location,
            match
          };

          // match 渲染三者之一 children(function|children) component render 或者null
          // 不match children是function时候渲染children 否则null

          return props.match
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
