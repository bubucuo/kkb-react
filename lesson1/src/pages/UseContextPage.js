import React, {useContext} from "react";
import {ThemeContext, UserContext} from "../Context";

export default function UseContextPage(props) {
  const {themeColor} = useContext(ThemeContext);
  const {name} = useContext(UserContext);

  return (
    <div className="border">
      <h3 className={themeColor}>UseContextPage</h3>
      <p>{name}</p>
    </div>
  );
}
