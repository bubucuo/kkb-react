import {
  REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from "../action/const";

const userInit = {
  isLogin: false,
  userInfo: {id: null, name: "", score: 0},
  loading: false,
  err: {msg: ""}
};

// 定义修改规则
export const loginReducer = (state = {...userInit}, {type, payload}) => {
  switch (type) {
    case REQUEST:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {...state, isLogin: true, loading: false, userInfo: {...payload}};
    case LOGIN_FAILURE:
      return {...state, ...userInit, ...payload};
    case LOGOUT_SUCCESS:
      return {...state, ...userInit};
    default:
      return state;
  }
};
