import React, {Component} from "react";
import {ThemeConsumer, UserConsumer} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <ThemeConsumer>
          {ctx => (
            <div>
              <h3 className={ctx.themeColor}>ConsumerPage</h3>
              <UserConsumer>{user => <p>{user.name}</p>}</UserConsumer>
            </div>
          )}
        </ThemeConsumer>
      </div>
    );
  }
}

/**
 * contetxType
 */
