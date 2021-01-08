import {createStore, combineReducers} from "redux";
import {loginReducer} from "./loginReducer";

const store = createStore(combineReducers({user: loginReducer}));

export default store;
