import {createStore, combineReducers, applyMiddleware} from "redux";
import {loginReducer} from "./loginReducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
// import loginSaga from "../action/loginSaga";
import rootSaga from "../action/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(sagaMiddleware)
  // applyMiddleware(thunk)
);

sagaMiddleware.run(rootSaga);

export default store;
