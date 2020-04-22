import React, {useReducer, useLayoutEffect, useEffect} from "react";
import {counterReducer} from "../store";

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(counterReducer, 0);

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
      <p>{state}</p>
      <button onClick={() => dispatch({type: "ADD"})}>add</button>
    </div>
  );
}
