import React, {useContext} from "react";
import {ThemeContext} from "../Context";

export default function UserPage(props) {
  const ctx = useContext(ThemeContext);
  console.log("ctx", ctx); //sy-log
  return (
    <div>
      <h3 className={ctx.themeColor}>UserPage</h3>
    </div>
  );
}
