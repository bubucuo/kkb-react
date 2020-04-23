import {createStore, combineReducers} from "redux";

const initUser = {
  isLogin: false,
  username: ""
};
// 定义修改规则
export const loginReducer = (state = {initUser}, {type}) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {...state, isLogin: true, username: "xiaoming"};
    default:
      return state;
  }
};

const store = createStore(combineReducers({user: loginReducer}));

export default store;
