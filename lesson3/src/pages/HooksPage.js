import {useEffect, useReducer} from "react";
import {countReducer} from "../store";

const init = (initArg) => initArg - 0;

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  // cdm cdu cdwu
  useEffect(() => {
    console.log("did mount"); //sy-log

    return () => {
      console.log("omg"); //sy-log
    };
  }, [state]);

  useEffect(() => {
    return () => {
      console.log("useEffect, will un mount"); //sy-log
    };
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>{state}</button>
    </div>
  );
}
