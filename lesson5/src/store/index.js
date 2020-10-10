import {loginReducer} from "./loginReducer";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

// store管理状态
const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(thunk)
);

export default store;
