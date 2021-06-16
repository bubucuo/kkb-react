import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";

// export const login = (userInfo) => ({type: LOGIN_SUCCESS, payload: userInfo});

// * 方案1：redux-thunk
// * 优点： 简单
// * 缺点：不适合处理复杂嵌套，容易形成嵌套地狱
// export const login = (userInfo) => (dispatch) => {
//   dispatch({type: REQUEST});

//   LoginService.login(userInfo).then(
//     (res) => {
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       // 嵌套
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

// * 方案2：async await
// 优点： 简单，是generator的语法糖，没有嵌套地狱的担心
// 缺点： 没有generator强大
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

// 方法3：  redux-saga
// * 优点： 功能强大
// *缺点: 麻烦
export const login = (userInfo) => ({type: LOGIN_SAGA, payload: userInfo});
