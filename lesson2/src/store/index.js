import {createStore, applyMiddleware, combineReducers} from "redux";
// import {createStore, applyMiddleware} from "../kredux/";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rdPromise from "redux-promise";
// import isPromise from "is-promise";
// import {isFSA} from "flux-standard-action";

// 定义修改规则
export const counterReducer = (state = 0, {type, payload = 1}) => {
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

const store = createStore(
  combineReducers({
    home: counterReducer
    // user: userReducer
  }),
  applyMiddleware(thunk, logger, rdPromise)
);

export default store;

// function logger() {

//   return next => action => {
//     console.log(action.type + "执行了！"); //sy-log
//     return next(action);
//   };
// }

// function logger({getState}) {
//   return next => {
//     // console.log("next", next); //sy-log
//     return action => {
//       console.log("====================================");
//       console.log(action.type + "执行了！"); //sy-log
//       console.log("prev state", getState()); //sy-log
//       let returnValue = next(action);
//       console.log("next state", getState()); //sy-log
//       console.log("====================================");
//       return returnValue;
//     };
//   };
// }

// function thunk({dispatch, getState}) {
//   return next => action => {
//     if (typeof action === "function") {
//       return action(dispatch, getState);
//     }
//     return next(action);
//   };
// }

// function rdPromise({dispatch}) {
//   return next => action => {
//     if (!isFSA(action)) {
//       // return action(dispatch, getState);
//       return isPromise(action) ? action.then(dispatch) : next(action);
//     }
//     return next(action);
//   };
// }
