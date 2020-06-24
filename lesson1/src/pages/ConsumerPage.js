import React, {Component} from "react";
import {ThemeConsumer, UserConsumer} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <h3>ConsumerPage</h3>
        <ThemeConsumer>
          {context => (
            <div className={context.themeColor}>
              omg
              <UserConsumer>{user => <p>{user.name}</p>}</UserConsumer>
            </div>
          )}
        </ThemeConsumer>
      </div>
    );
  }
}
