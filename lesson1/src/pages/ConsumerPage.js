import React, {Component} from "react";
import {ThemeConsumer, UserConsumer} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <h3>ConsumerPage</h3>
        <ThemeConsumer>
          {themeContext => (
            <div className={themeContext.themeColor}>
              哈哈哈哈
              <UserConsumer>
                {userContext => <h5>{userContext.name}</h5>}
              </UserConsumer>
            </div>
          )}
        </ThemeConsumer>
      </div>
    );
  }
}
