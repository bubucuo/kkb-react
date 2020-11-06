import React, {Component} from "react";
import {RouterContext} from "./RouterContext";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {location} = context;
          const {path, component} = this.props;
          const match = location.pathname === path;
          return match ? React.createElement(component) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
