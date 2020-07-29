import React, {Component} from "react";
import {ThemeProvider, UserProvider, UserContext} from "../Context";
import ConsumerPage from "./ConsumerPage";
import UseContextPage from "./UseContextPage";

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {name: "xiaoming"}
    };
  }
  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <ThemeProvider value={theme}>
          <UserProvider value={user}>
            <ConsumerPage />
            <UseContextPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    );
  }
}
