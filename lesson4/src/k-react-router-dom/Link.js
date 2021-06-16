import {useContext} from "react";
import RouterContext from "./RouterContext";

function Link({to, children, ...restProps}) {
  // 子组件消费context value
  const context = useContext(RouterContext);
  const handleClick = (e) => {
    e.preventDefault();
    // 命令式跳转
    context.history.push(to);
  };
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
export default Link;
