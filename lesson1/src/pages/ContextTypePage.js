import React, {Component, useContext} from "react";
import {ThemeContext} from "../Context";

export default class ContextTypePage extends Component {
  static contextType = ThemeContext;
  render() {
    const {themeColor} = this.context || {};
    return (
      <div>
        <h3 className={themeColor}>ContextTypePage</h3>
        <Child />
      </div>
    );
  }
}

export function Child(props) {
  const themeContext = useContext(ThemeContext);
  console.log("themeContext----", themeContext); //sy-log
  // const {themeColor} = themeContext;
  return <div className="border">-------Child</div>;
}
