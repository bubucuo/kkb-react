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

// react-redux 是一个react与redux的绑定库，背后原理就是Context
