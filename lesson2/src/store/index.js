import {createStore, applyMiddleware, combineReducers} from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// import {createStore, applyMiddleware} from "../kredux/";

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

const store = createStore(
  combineReducers({
    count: countReducer
    // count2: countReducer2
  }),
  applyMiddleware(thunk, logger)
);

export default store;

// thunk处理异步
function thunk({dispatch, getState}) {
  // next是聚合函数，相当于compose中的a
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

// ! 注意了： logger一定要放在applyMiddleware最后一个参数，因为放在前面的话，可能或没有type值，
// ! 比如说thunk处理的函数也是’action‘，但是就没有type值
function logger({dispatch, getState}) {
  return next => action => {
    console.log("start *************************************");
    console.log(action.type + "执行啦"); //sy-log
    // dispatch执行前的state
    const prevState = getState();
    console.log("prev state" + prevState); //sy-log

    // 相当于dispatch执行完了，数据已经发生变化
    const returnValue = next(action);
    const nextState = getState();
    console.log("next state" + nextState); //sy-log

    console.log("end *************************************");

    return returnValue;
  };
}
