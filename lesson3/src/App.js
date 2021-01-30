import React, {useState} from "react";
import HooksPage from "./pages/HooksPage";
import ReactReduxPage from "./pages/ReactReduxPage";

export default function App(props) {
  // const [state, setState] = useState(1);
  return (
    <div>
      {/* <button onClick={() => setState(state + 1)}>{state}</button> */}
      {/* {state % 2 && <HooksPage />} */}
      <ReactReduxPage title="哈哈哈" />
    </div>
  );
}
