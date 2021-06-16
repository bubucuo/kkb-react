import {createStore, combineReducers, applyMiddleware} from "redux";
import {loginReducer} from "./loginReducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import loginSaga from "../action/loginSaga";

const sagaMiddleware = createSagaMiddleware();

// 创建一个状态管理库
const store = createStore(
  combineReducers({user: loginReducer, cart: cartReducer}),
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(loginSaga);

export default store;
