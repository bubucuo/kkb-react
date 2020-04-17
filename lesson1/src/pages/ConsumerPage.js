import React, {Component} from "react";
import {ThemeContext, UserContext} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div className="border">
        <h3>ConsumerPage</h3>
        <ThemeContext.Consumer>
          {themeCtx => (
            <div className={themeCtx.themeColor}>
              {
                <UserContext.Consumer>
                  {user => <div>{user.name}</div>}
                </UserContext.Consumer>
              }
            </div>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}
