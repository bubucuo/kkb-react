import LoginService from "../service/login";
import {LOGIN_SAGA} from "./const";

// export const login = (userInfo) => ({type: "LOGIN_SUCCESS", payload: userInfo});
// ! 异步解决方案

// 方案1：使用中间件redux-thunk
// 优点： 使用简单
// 缺点：容易陷入嵌套地狱
// export const login = (userInfo) => (dispatch) => {
//   dispatch({type: "REQUEST"});
//   LoginService.login(userInfo).then(
//     (res) => {
//       // dispatch({type: "LOGIN_SUCCESS", payload: res});
//       getMoreUserInfo(dispatch, res);
//     },
//     (err) => {
//       dispatch({type: "LOGIN_FAILURE", payload: err});
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

// // 方案2：async await
// // 优点： 简单，是generator的语法糖，没有嵌套地狱的担心
// // 缺点： 没有generator强大
// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: "REQUEST"});
//     // 请求1： 用户登录
//     let res1 = await loginPromise(dispatch, userInfo);
//     console.log("rrrr", res1); //sy-log
//     // 请求2： 根据用户基本信息获取详细信息
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// 方案3：redux-saga
export const login = (userInfo) => ({type: LOGIN_SAGA, payload: userInfo});
