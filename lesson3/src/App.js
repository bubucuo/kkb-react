import React, {useState} from "react";
// import ReactReduxHooksPage from "./pages/ReactReduxHooksPage";
// import HooksPage from "./pages/HooksPage";
import ReactReduxPage from "./pages/ReactReduxPage";

export default function App(props) {
  const [state, setState] = useState(1);
  return (
    <div>
      <button onClick={() => setState(state + 1)}>{state}</button>
      <ReactReduxPage title="hahha " count={state} />
      {/* {state % 2 && <HooksPage />} */}
      {/* <ReactReduxHooksPage /> */}
    </div>
  );
}
