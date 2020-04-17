import React, {Component} from "react";
import {ThemeContext, UserContext} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div className="border">
        <ThemeContext.Consumer>
          {themeContext => (
            <>
              <h3 className={themeContext.themeColor}>ConsumerPage</h3>
              <UserContext.Consumer>
                {userContext => <HandleUserContext {...userContext} />}
              </UserContext.Consumer>
            </>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

function HandleUserContext(userCtx) {
  return <div>{userCtx.name}</div>;
}
