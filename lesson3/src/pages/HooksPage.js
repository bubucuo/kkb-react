import {useEffect, useLayoutEffect, useReducer} from "react";

import {countReducer} from "../store/";

const init = (initArg) => initArg - 0;

export default function HooksPage(props) {
  const [count, dispatch] = useReducer(countReducer, "0", init);

  useEffect(() => {
    console.log("useEffect"); //sy-log 0

    return () => {
      console.log("useEffect will un mount"); //sy-log
    };
  }, [count]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log 1

    // return () => {
    //   console.log("will un mount"); //sy-log
    // };
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>{count}</button>
      <button onClick={() => dispatch({type: "MINUS"})}>- {count}</button>
    </div>
  );
}
