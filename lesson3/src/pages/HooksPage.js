import {useEffect, useLayoutEffect, useReducer} from "react";
import {countReducer} from "../store";

const init = (initArg) => initArg - 0;

// !  useReducer 和useState类似
// useReducer适合修改逻辑复杂的状态，因为可以把状态抽取到reducer中，也方便复用
export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  // didmount didupdate willunmount
  useEffect(() => {
    console.log("useEffect"); //sy-log
    return () => {
      console.log(" useEffect willunmount"); //sy-log
    };
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
    return () => {
      console.log("useLayoutEffect willunmount"); //sy-log
    };
  }, []);

  // ajax

  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>{state}</button>
    </div>
  );
}
