import {useReducer, useEffect, useLayoutEffect} from "react";
import {countReducer} from "../store";

const init = (initArg) => initArg - 0;

function HooksPage(props) {
  const [count, dispatch] = useReducer(countReducer, "0", init);
  const [count2, dispatch2] = useReducer(countReducer, "0", init);

  // ajax
  //可以类比类组件当中的三个生命周期
  // cdm cdu cdum
  useEffect(() => {
    console.log("useEffect"); //sy-log
    return () => {
      console.log("useEffect unmount"); //sy-log
    };
  }, [count]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
    return () => {
      console.log("useLayoutEffect unmount "); //sy-log
    };
  }, [count]);

  // useEffect__()dom渲染
  // useLayoutEffect--dom渲染
  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>{count}</button>
      <button onClick={() => dispatch2({type: "ADD"})}>{count2}</button>
    </div>
  );
}
export default HooksPage;
