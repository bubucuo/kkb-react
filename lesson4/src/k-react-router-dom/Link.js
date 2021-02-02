import React, {useContext} from "react";
import RouterContext from "./RouterContext";

export default function Link({children, to, ...restProps}) {
  const {history} = useContext(RouterContext);
  const handleClik = (e) => {
    e.preventDefault();
    // 命令式跳转
    history.push(to);
  };
  return (
    <a href={to} {...restProps} onClick={handleClik}>
      {children}
    </a>
  );
}
