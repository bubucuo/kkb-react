import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./loginReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../action/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
