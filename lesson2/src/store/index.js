// import {createStore, applyMiddleware} from "redux";
import {createStore, applyMiddleware} from "../kredux/";
import thunk from "redux-thunk"; // 异步解决方案
import logger from "redux-logger"; // 打印日志

// 定义修改store state的规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;
