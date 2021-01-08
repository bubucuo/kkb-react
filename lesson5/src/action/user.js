import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS} from "./const";
import loginSaga from "./loginSaga";

// export const login = (userInfo) => ({type: LOGIN_SUCCESS, payload: userInfo});

// 异步
// 方法1：redux-thunk 优点：使用简单 缺点：容易形成嵌套地狱
// export const login = (userInfo) => (dispatch) => {
//   LoginService.login(userInfo).then(
//     (res) => {
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       getMoreUserInfo(dispatch, res);
//     },
//     (err) => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// export const getMoreUserInfo = (dispatch, userInfo) => {
//   LoginService.getMoreUserInfo(userInfo).then(
//     (res) => {
//       dispatch({type: LOGIN_SUCCESS, payload: res});
//     },
//     (err) => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// export const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     (res) => {
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       getMoreUserInfo(dispatch, res);
//     },
//     (err) => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// 方法2：async / await
// 优点：简单 是generator的语法糖，也可以同步的方式实现异步
// 缺点：比thunk“复杂”一点
// export function login(userInfo) {
//   return async function(dispatch) {
//     let res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// 方法3：redux-saga
export const login = (userInfo) => {
  return {type: LOGIN_SAGA, payload: userInfo};
};
