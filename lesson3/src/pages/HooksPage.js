import React from "react";
import {countReducer} from "../store/";

const init = initArg => initArg - 0;

export default function HooksPage(props) {
  const [state, dispatch] = React.useReducer(countReducer, "0", init);

  React.useEffect(() => {
    console.log("useEffect state", state); //sy-log

    // 组件卸载之前执行
    return () => {
      console.log("will unmount"); //sy-log
    };
  }, [state]);

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect state", state); //sy-log
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>add {state}</button>
    </div>
  );
}
