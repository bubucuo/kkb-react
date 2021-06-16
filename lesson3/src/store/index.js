import {createStore, combineReducers} from "redux";

// 定义修改规则
export const countReducer = (state = 0, {type, payload = 1}) => {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};

// 创建一个数据仓库
const store = createStore(combineReducers({count: countReducer}));

export default store;
