import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./loginReducer";

const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(thunk)
);

export default store;
