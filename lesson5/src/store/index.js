import {loginReducer} from "./loginReducer";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(thunk)
);

export default store;
