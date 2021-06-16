import {createStore, applyMiddleware, combineReducers} from "redux";
// import {createStore, applyMiddleware} from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import isPromise from "is-promise";
import {isFSA} from "flux-standard-action";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + action.payload || 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

// 创建一个数据仓库
const store = createStore(
  // countReducer,
  combineReducers({count: countReducer}),
  applyMiddleware(thunk, promise, logger)
);

export default store;

// 解决异步
function thunk({getState, dispatch}) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

// logger 打印日志
function logger({getState, dispatch}) {
  return (next) => (action) => {
    console.log("--------------------------"); //sy-log
    console.log(action.type + "执行了！"); //sy-log
    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    const nextState = getState();

    console.log("next state", nextState); //sy-log

    console.log("--------------------------"); //sy-log

    return returnValue;
  };
}

function promise({getState, dispatch}) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
