import React, {useReducer, useEffect, useLayoutEffect} from "react";
import {countReducer} from "../store";

const init = initArg => {
  return initArg - 0;
};

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  useEffect(() => {
    console.log("useEffect", state); //sy-log
    return () => {
      console.log("unmount"); //sy-log
    };
  }, []);

  useEffect(() => {
    console.log("useEffect", state); //sy-log
  }, [state]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button
        onClick={() => {
          dispatch({type: "ADD"});
          {
            /* console.log("state", state); //sy-log */
          }
        }}>
        add
      </button>
    </div>
  );
}
