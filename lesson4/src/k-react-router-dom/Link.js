import React, {useContext} from "react";
import RouterContext from "./RouterContext";

export default function Link({to, children, ...restProps}) {
  const context = useContext(RouterContext);
  const handleClick = e => {
    e.preventDefault();
    context.history.push(to);
  };
  return (
    <a href={to} {...restProps} onClick={handleClick}>
      {children}
    </a>
  );
}
