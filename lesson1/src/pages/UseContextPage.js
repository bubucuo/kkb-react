import React, {useContext} from "react";
import {ThemeContext} from "../Context";

export default function UseContextPage(props) {
  const {themeColor} = useContext(ThemeContext);
  return (
    <div className="border">
      <h3 className={themeColor}>UseContextPage</h3>
    </div>
  );
}
