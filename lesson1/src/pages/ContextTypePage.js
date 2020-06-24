import React, {Component} from "react";
import {ThemeContext} from "../Context";

export default class ContextTypePage extends Component {
  static contextType = ThemeContext;
  // static contextType = UserContext;

  render() {
    const {themeColor, name} = this.context;
    return (
      <div className="border">
        <h3 className={themeColor}>ContextTypePage</h3>
        <p>{name}</p>
      </div>
    );
  }
}
