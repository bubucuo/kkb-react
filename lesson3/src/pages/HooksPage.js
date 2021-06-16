import {useEffect, useLayoutEffect, useReducer} from "react";
import {countReducer} from "../store";

const init = (initArg) => initArg - 0;

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  // cdm cdu cwum
  useEffect(() => {
    console.log("useEffect"); //sy-log
    // 如果依赖数组为空，下面的函数是组件卸载之前执行
    // 如果依赖数组不为空，下面的函数是在组件更新之前执行
    return () => {
      console.log("useEffect will un mount"); //sy-log
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
    // 如果依赖数组为空，下面的函数是组件卸载之前执行
    // 如果依赖数组不为空，下面的函数是在组件更新之前执行
    return () => {
      console.log(" useLayoutEffect will un mount"); //sy-log
    };
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>{state}</button>
    </div>
  );
}
