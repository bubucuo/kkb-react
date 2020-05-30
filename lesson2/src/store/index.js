import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// import {createStore} from "../kredux/";
// import createStore from "../kredux/createStore";

export const countReducer = (state = 0, {type, payload = 1}) => {
  switch (type) {
    case "ADD":
      return state + payload;
    //如果state是对象
    // return {...state, ...newState};
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;
