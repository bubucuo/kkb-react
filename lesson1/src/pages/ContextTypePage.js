import React, {Component} from "react";
import {ThemeContext, UserContext} from "../Context";

export default class ContextTypePage extends Component {
  static contextType = ThemeContext;
  static contextType = UserContext;
  render() {
    const {themeColor, name} = this.context;
    return (
      <div className="border">
        天哪
        <h3 className={themeColor}>ContextTypePage</h3>
        <p>user: {name}</p>
      </div>
    );
  }
}
