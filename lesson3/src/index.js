import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store/";
// import {Provider} from "react-redux";
import {Provider} from "./kReactRedux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
