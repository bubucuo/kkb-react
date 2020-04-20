import React, {useState} from "react";
import ReduxPage from "./pages/ReduxPage";

export default function App(props) {
  const [num, setNum] = useState(1);
  return (
    <div>
      <button onClick={() => setNum(num + 1)}>{num}</button>

      {num % 2 && <ReduxPage />}
    </div>
  );
}
