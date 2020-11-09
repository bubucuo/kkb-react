import {loginReducer} from "./loginReducer";
import {createStore, combineReducers} from "redux";

const store = createStore(combineReducers({user: loginReducer}));

export default store;
