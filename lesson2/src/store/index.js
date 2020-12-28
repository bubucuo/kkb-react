import {applyMiddleware, createStore, combineReducers} from "redux";
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
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

// 数据仓库 get set subscribe（订阅）
const store = createStore(
  combineReducers({count: countReducer}),
  applyMiddleware(thunk, promise, logger)
);

// 处理异步的thunk
function thunk({dispatch, getState}) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function logger({dispatch, getState}) {
  return (next) => (action) => {
    console.log("--------------------------"); //sy-log
    console.log(action.type, "执行啦！"); //sy-log
    let prevState = getState();
    console.log("prev state", prevState); //sy-log
    const returnValue = next(action);
    let nextState = getState();
    console.log("next state", nextState); //sy-log
    console.log("--------------------------"); //sy-log

    return returnValue;
  };
}

function promise({dispatch}) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}

export default store;
