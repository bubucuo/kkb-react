import React, {Component} from "react";
import ContextPage from "./pages/ContextPage";
import HocPage from "./pages/HocPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <ContextPage /> */}
        <HocPage />
      </div>
    );
  }
}
export default App;
