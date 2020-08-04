import {loginReducer} from "./loginReducer";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import loginSaga from "../action/loginSaga";
import rootSaga from "../action/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({user: loginReducer}),
  // applyMiddleware(thunk)
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
