import {loginReducer} from "./loginReducer";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

const store = createStore(combineReducers({user: loginReducer}));

export default store;
