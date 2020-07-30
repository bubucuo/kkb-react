import React, {useReducer, useEffect, useLayoutEffect} from "react";
import {counterReducer} from "../store/";

const init = initArg => {
  return initArg - 0;
};

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(counterReducer, "0", init);

  useEffect(() => {
    console.log("useEffect"); //sy-log
  }, [state]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => dispatch({type: "ADD"})}>add</button>
    </div>
  );
}
