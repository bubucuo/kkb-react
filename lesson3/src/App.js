import React from "react";
import ReactReduxHooksPage from "./pages/ReactReduxHooksPage";
import ReactReduxPage from "./pages/ReactReduxPage";
// import HooksPage from "./pages/HooksPage";

export default function App(props) {
  const [state, setState] = React.useState(1);
  return (
    <div>
      <button onClick={() => setState(state + 1)}>add {state}</button>
      {/* <ReactReduxPage /> */}
      {/* {state % 2 && <HooksPage />} */}

      {/* <HooksPage /> */}

      <ReactReduxHooksPage />
    </div>
  );
}
