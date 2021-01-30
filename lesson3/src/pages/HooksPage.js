import React, {useEffect, useLayoutEffect, useReducer, useState} from "react";
import {countReducer} from "../store";

const init = (initArg) => initArg - 0;

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);
  // ! 与useState有何不同
  const [count, setCount] = useState(0);
  // useReducer适合修改逻辑相对复杂的state，并且还可以复用reducer

  // 类比cdm、cdu、cwum
  useEffect(() => {
    console.log("useEffect"); //sy-log

    // 组件卸载之前执行
    return () => {
      console.log("will un mount"); //sy-log
    };
  }, [state, count]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>

      <p>{state}</p>
      <button onClick={() => dispatch({type: "ADD", payload: 100})}>
        click
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        click add count {count}
      </button>
    </div>
  );
}
