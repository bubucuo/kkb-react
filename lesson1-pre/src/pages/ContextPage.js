import React, {Component} from "react";
import HomePage from "./HomePage";
import {ThemeProvider} from "../Context";

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
    const {theme} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <ThemeProvider value={theme}>
          <HomePage />
        </ThemeProvider>
      </div>
    );
  }
}
