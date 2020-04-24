import React, {Component} from "react";
import {RouterContext} from "./Context";

export default class Redirect extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {history} = context;
          const {to, push = false} = this.props;
          return (
            <LifeCycle
              onMount={() => {
                push ? history.push(to) : history.replace(to);
              }}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }
  render() {
    return null;
  }
}
