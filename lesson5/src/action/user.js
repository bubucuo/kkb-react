import {LOGIN_SUCCESS, LOGIN_FAILURE, REQUEST, LOGIN_SAGA} from "./const";
import LoginService from "../service/login";

// export const login = userInfo => ({type: LOGIN_SUCCESS, payload: userInfo});

//方法1： 异步方法： redux-thunk
// 多个异步，用嵌套，优点：如果说简单的异步，使用起来很简单
// 缺点：容易形成回调地狱
// export const login = userInfo => dispatch => {
//   dispatch({type: REQUEST});

//   LoginService.login(userInfo).then(
//     res => {
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       getMoreUserInfo(dispatch, res);
//     },
//     err => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// export const getMoreUserInfo = (dispatch, userInfo) => {
//   LoginService.getMoreUserInfo(userInfo).then(
//     res => {
//       dispatch({type: LOGIN_SUCCESS, payload: res});
//     },
//     err => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// export const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     res => {
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       getMoreUserInfo(dispatch, res);
//     },
//     err => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// ++++++++++++++++++++++++++++++++
// 方法2： async await 优点:简单 ，是generator的语法糖
// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: REQUEST});

//     let res1 = await loginPromise(dispatch, userInfo);

//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// 方法3：  redux-saga

export const login = userInfo => ({type: LOGIN_SAGA, payload: userInfo});
