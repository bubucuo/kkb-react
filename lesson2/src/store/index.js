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

const store = createStore(
  // countReducer,
  combineReducers({count: countReducer}),
  applyMiddleware(promise, thunk, logger)
);

export default store;

function thunk({getState, dispatch}) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function logger({getState, dispatch}) {
  return (next) => (action) => {
    console.log("------------------------------------------"); //sy-log
    console.log("prev state", getState()); //sy-log

    console.log(action.type + "执行啦"); //sy-log

    const returnValue = next(action);

    console.log("next state", getState()); //sy-log

    console.log("------------------------------------------"); //sy-log

    return returnValue;
  };
}

function promise({getState, dispatch}) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
