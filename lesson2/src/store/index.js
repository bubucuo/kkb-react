// import {createStore, applyMiddleware} from "redux";
import {createStore, applyMiddleware} from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

export const counterReducer = (state = 0, {type, payload = 1}) => {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      console.log("state", state); //sy-log
      return state;
  }
};

const store = createStore(counterReducer, applyMiddleware(thunk, logger));

export default store;

function logger({getState}) {
  return next => action => {
    console.log("====================================");
    console.log(action.type + "执行了！"); //sy-log

    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    const nextState = getState();
    console.log("next state", nextState); //sy-log
    console.log("====================================");
    return returnValue;
  };
}

function thunk({dispatch, getState}) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}
