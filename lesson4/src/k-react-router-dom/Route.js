import React, {Component} from "react";
import RouterContext from "./RouterContext";

class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {location} = context;
          const {path, children, component, render} = this.props;
          const match = window.location.pathname === path;
          return match ? React.createElement(component) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Route;
