import React, {Component} from "react";
import {Context, UserContext} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <h3>ConsumerPage</h3>
        <Context.Consumer>
          {theme => {
            return (
              <div className={theme.themeColor}>
                omg
                <UserContext.Consumer>
                  {user => <User {...user} />}
                </UserContext.Consumer>
              </div>
            );
          }}
        </Context.Consumer>
      </div>
    );
  }
}

function User({name}) {
  return <div>{name}</div>;
}
