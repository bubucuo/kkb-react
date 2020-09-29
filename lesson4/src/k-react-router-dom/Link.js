import React, {forwardRef} from "react";
import {RouterContext} from "./Context";

const Link = forwardRef(({to, children, ...restProps}, ref) => {
  const context = React.useContext(RouterContext);
  const handleClick = e => {
    e.preventDefault();
    // 通过命令跳转页面
    context.history.push(to);
  };
  return (
    <a href={to} ref={ref} onClick={handleClick}>
      {children}
    </a>
  );
});

export default Link;
