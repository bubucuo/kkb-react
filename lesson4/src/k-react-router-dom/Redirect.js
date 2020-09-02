import React, {Component} from "react";
import {RouterContext} from "./Context";
import LifeCycle from "./LifeCycle";
export default class Redirect extends Component {
  // ! render是要返回ui的，也就是当前组件的子节点， 你跳转走了 ，就没了children了
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {to, push = false} = this.props;
          return (
            <LifeCycle
              onMount={() => {
                push ? context.history.push(to) : context.history.replace(to);
              }}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
