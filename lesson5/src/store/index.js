import {loginReducer} from "./loginReducer";
import {createStore, combineReducers} from "redux";
import loginSaga from "../action/loginSaga";

const store = createStore(combineReducers({user: loginReducer}));

export default store;
