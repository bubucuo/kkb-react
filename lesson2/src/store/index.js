// import {createStore, applyMiddleware} from "redux";
import {createStore, applyMiddleware} from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";

// 判读是否是promise类型
import isPromise from "is-promise";

// 判读是否标准 标准的类型是{type: 'XXX', payload: 'XXX'}
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

const store = createStore(
  countReducer,
  applyMiddleware(thunk, logger, promise)
);

export default store;

function thunk({dispatch, getState}) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function logger({getState}) {
  return next => action => {
    console.log("======================"); //sy-log

    console.log(action.type + "执行了！"); //sy-log

    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);

    const nextState = getState();
    console.log("next state", nextState); //sy-log
    console.log("======================"); //sy-log
    return returnValue;
  };
}

function promise({dispatch}) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(res => dispatch({...action, payload: res}))
      : next(action);
  };
}
