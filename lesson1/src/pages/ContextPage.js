import React, {Component} from "react";
import {ThemeProvider} from "../Context";

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {
        name: "小明"
      }
    };
  }

  changeColor = () => {
    const {themeColor} = this.state.theme;
    this.setState({
      theme: {themeColor: themeColor === "red" ? "green" : "red"}
    });
  };

  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <h3 className={theme.themeColor}>ContextPage</h3>
        <button onClick={this.changeColor}>change color</button>
      </div>
    );
  }
}
