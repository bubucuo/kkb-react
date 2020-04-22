import React, {useReducer, useEffect, useLayoutEffect} from "react";
import {counterReducer} from "../store";

const init = initArg => {
  return initArg + 1;
};

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(counterReducer, 100, init);
  let a = 0;

  useEffect(() => {
    console.log("useEffect"); //sy-log
  });

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
  });

  console.log("---"); //sy-log

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{a}</p>
      <p>{state}</p>
      <button onClick={() => dispatch({type: "ADD", payload: 100})}>add</button>
    </div>
  );
}
