import {useContext} from "react";
import RouterContext from "./RouterContext";

function Link({to, children, ...restProps}) {
  // 消费RouterContext
  const context = useContext(RouterContext);
  const handleClick = (e) => {
    e.preventDefault();
    context.history.push(to);
  };
  return (
    <a {...restProps} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
export default Link;
