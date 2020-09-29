import React, {Component} from "react";
import matchPath from "./matchPath";
import {RouterContext} from "./Context";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {path, children, component, render, computedMatch} = this.props;
          const {location} = context;
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match; //location.pathname === path;
          // 我们希望： 能够监听location，一旦location发生变化，子组件也更新就可以啦
          // 这个props就是所谓的route props
          const props = {
            ...context,
            location,
            match
          };
          // children, component, render互斥，渲染其中之一
          // match  渲染children(function|组件复合的children), component, render之一，
          // 不match 渲染children function
          //return match ? React.createElement(component, props) : null;
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
