import {createStore, combineReducers} from "redux";

const userInit = {
  isLogin: false,
  username: ""
};

// 定义修改规则
export const loginReducer = (state = {userInit}, {type}) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {...state, isLogin: true, username: "xiaobai"};
    default:
      return state;
  }
};

const store = createStore(combineReducers({user: loginReducer}));

export default store;
