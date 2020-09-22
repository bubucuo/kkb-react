import React, {Component} from "react";
import {ThemeContext, UserContext} from "../Context";

export default class ContextTypePage extends Component {
  static contextType = ThemeContext;
  // static contextType = UserContext;

  render() {
    const {themeColor, user} = this.context;
    console.log("ContextTypePage", this.context); //sy-log
    return (
      <div>
        <h3 className={themeColor}>ContextTypePage</h3>
      </div>
    );
  }
}
