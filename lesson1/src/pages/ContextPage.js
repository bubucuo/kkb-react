import React, {Component} from "react";
import {ThemeProvider, UserProvider} from "../Context";
import ContextTypePage from "./ContextTypePage";
import UseContextPage from "./UseContextPage";

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      }
    };
  }

  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <ThemeProvider value={theme}>
          <ContextTypePage />
          <UseContextPage />
        </ThemeProvider>
      </div>
    );
  }
}
