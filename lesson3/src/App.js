import React, {useState} from "react";
import HooksPage from "./pages/HooksPage";
import ReactReduxPage from "./pages/ReactReduxPage";
import ReduxHooksPage from "./pages/ReduxHooksPage";
import ReactRouterPage from "./pages/ReactRouterPage";

export default function App(props) {
  // const [state, setState] = useState(0);
  return (
    <div>
      {/* <button onClick={() => setState(state + 1)}>add : {state}</button> */}
      {/* <HooksPage /> */}
      {/* {state % 2 && <ReactReduxPage state={state} />} */}
      {/* <ReduxHooksPage /> */}
      <ReactRouterPage />
    </div>
  );
}
