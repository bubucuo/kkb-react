import React, {Component} from "react";
import {ThemeContext} from "../Context";
import UserPage from "./UserPage";

class HomePage extends Component {
  // static contextType = ThemeContext;
  render() {
    console.log("this", this); //sy-log
    const {themeColor} = this.context;
    return (
      <div>
        <h3 className={themeColor}>HomePage</h3>
        <UserPage />
      </div>
    );
  }
}

HomePage.contextType = ThemeContext;

export default HomePage;
