import React, {Component} from "react";
import {ThemeConsumer, UserConsumer} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div className="border">
        <h3>ConsumerPage</h3>
        <ThemeConsumer>
          {themeContext => (
            <div className={themeContext.themeColor}>
              themeColor
              <UserConsumer>
                {userContext => <p>user: {userContext.name}</p>}
              </UserConsumer>
            </div>
          )}
        </ThemeConsumer>
      </div>
    );
  }
}
