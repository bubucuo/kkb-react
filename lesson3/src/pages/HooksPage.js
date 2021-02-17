import React from "react";
import {countReducer} from "../store";

const initArg = init => init - 0;

// reducer 是干嘛的
// 定义修改规则
export default function HooksPage(props) {
  const [state, dispatch] = React.useReducer(countReducer, "0", initArg);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("useeffect"); //sy-log
    return () => {
      // console.log("will unmount"); //sy-log
    };
  }, [state]);

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
    return () => {
      // console.log("will unmount"); //sy-log
    };
  }, [state]);

  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>{state}</button>
    </div>
  );
}
