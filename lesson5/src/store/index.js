import {createStore, combineReducers, applyMiddleware} from "redux";
import {loginReducer} from "./loginReducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import loginSaga from "../action/loginSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(loginSaga);

export default store;
