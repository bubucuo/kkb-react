import LoginService from "../service/login";
import {REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_SAGA} from "./const";
import co from "co";

// export const login = (userInfo) => ({type: LOGIN_SUCCESS, payload: userInfo});

// ! 异步解决方案
// * 1. redux-thunx + 嵌套
// 优点：使用简单
// 缺点： 对于复杂嵌套，容易形成嵌套地狱
// ajax1.then(ajax2（ajax3）)
//
// export const login = (userInfo) => (dispatch, getState) => {
//   dispatch({type: REQUEST});
//   LoginService.login(userInfo).then(
//     (res) => {
//       // dispacth({type: LOGIN_SUCCESS, payload: res});
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
//       dispatch({type: "LOGIN_SUCCESS", payload: res});
//     },
//     (err) => {
//       dispatch({type: "LOGIN_FAILURE", payload: err});
//     }
//   );
// };

// *async await ，是generator的语法糖
// 优点：同步的方式实现异步
// 缺点：没有generator功能多

// export const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     (res) => {
//       // dispatch({type: "LOGIN_SUCCESS", payload: res});
//       return res;
//     },
//     (err) => {
//       dispatch({type: "LOGIN_FAILURE", payload: err});
//     }
//   );
// };

// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: REQUEST});

//     let res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// export function login(userInfo) {
//   return function(dispatch) {
//     return co(function*() {
//       dispatch({type: "REQUEST"});
//       // 请求1： 用户登录
//       let res1 = yield loginPromise(dispatch, userInfo);
//       console.log("rrrr", res1); //sy-log
//       // 请求2： 根据用户基本信息获取详细信息
//       if (res1) {
//         getMoreUserInfo(dispatch, res1);
//       }
//     });
//   };
// }

// redux-saga

export const login = (userInfo) => ({type: LOGIN_SAGA, payload: userInfo});
