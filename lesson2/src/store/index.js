import {createStore, applyMiddleware, combineReducers} from "redux";
// import {createStore, applyMiddleware} from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import isPromise from "is-promise";

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

// 创建一个数据仓库
const store = createStore(
  // countReducer,
  combineReducers({count: countReducer}),
  applyMiddleware(promise, thunk, logger)
);

export default store;

function thunk({getState, dispatch}) {
  return (next) => (action) => {
    // console.log("thunk", next); //sy-log
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    // 执行下一个中间件函数或者dispatch
    return next(action);
  };
}

// next 就是下一个中间件函数或者dispatch
function logger({getState, dispatch}) {
  return (next) => (action) => {
    // console.log("logger", next); //sy-log

    console.log("+++++++++++++++++++++++++++++++++++++++"); //sy-log

    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    console.log("action ", action.type + "执行啦"); //sy-log
    // 修改状态
    const returnValue = next(action);
    const nextState = getState();
    console.log("next state", nextState); //sy-log
    console.log("+++++++++++++++++++++++++++++++++++++++"); //sy-log
    return returnValue;
  };
}

function promise({getState, dispatch}) {
  return (next) => (action) => {
    // console.log("promise", next); //sy-log
    if (isPromise(action)) {
      return action.then(dispatch);
    }
    return next(action);
  };
}

// dispatch一次，执行了所有的中间件函数和store.dispatch
