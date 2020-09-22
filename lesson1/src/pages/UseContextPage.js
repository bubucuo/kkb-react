import React, {useContext} from "react";
import {ThemeContext, UserContext} from "../Context";

// hook函数只能用在函数组件或者自定义hook
export default function UseContextPage(props) {
  const context = useContext(ThemeContext);
  const userContext = useContext(UserContext);

  return (
    <div className="border">
      <h3 className={context.themeColor}>UseContextPage</h3>
      <p>{userContext.name}</p>
    </div>
  );
}
