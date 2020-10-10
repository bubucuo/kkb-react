import LoginService from "../service/login";
import {LOGIN_SUCCESS, REQUEST, LOGIN_FAILURE} from "./const";

// 同步
// export const login = userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo});

export const login = userInfo => dispatch => {
  dispatch({type: REQUEST});
  LoginService.login(userInfo).then(
    res => {
      // dispatch({type: LOGIN_SUCCESS, payload: res});
      getMoreUserInfo(res, dispatch);
    },
    err => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};

export const getMoreUserInfo = (userInfo, dispatch) => {
  return LoginService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({type: LOGIN_SUCCESS, payload: res});
    },
    err => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};

// async await
// redux-saga
