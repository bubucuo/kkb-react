import React, {useState, useEffect, useContext} from "react";
import {ThemeContext, UserContext} from "../Context";

export default function UseContextPage(props) {
  const themeContext = useContext(ThemeContext);
  const {themeColor} = themeContext;
  const userContext = useContext(UserContext);
  return (
    <div className="border">
      <h3 className={themeColor}>UseContextPage</h3>
      <p>{userContext.name}</p>
    </div>
  );
}
