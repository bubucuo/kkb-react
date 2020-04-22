import React, {
  useReducer,
  useCallback,
  useEffect,
  useLayoutEffect
} from "react";
import {counterReducer} from "../store/";

const init = initArg => {
  return initArg + 1;
};

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(counterReducer, 0, init);

  const add = useCallback(() => {
    dispatch({
      type: "ADD"
    });
  }, []);

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

      <button onClick={add}>add</button>
    </div>
  );
}
