import {LOGIN_SUCCESS, REQUEST, LOGIN_FAILURE, LOGIN_SAGA} from "./const";
import LoginService from "../service/login";

// export const login = userInfo => ({type: LOGIN_SUCCESS, payload: userInfo});

// * 异步 方法1： redux-thunk 嵌套
// 缺点：容易形成嵌套地狱
// 优点：简单
// export const login = userInfo => dispatch => {
//   dispatch({type: REQUEST});
//   LoginService.login(userInfo).then(
//     res => {
//       // // 修改状态
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       getMoreUserInfo(dispatch, res);
//     },
//     err => {
//       // 修改状态
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// const getMoreUserInfo = (dispatch, userInfo) => {
//   LoginService.getMoreUserInfo(userInfo).then(
//     res => {
//       // 修改状态
//       dispatch({type: LOGIN_SUCCESS, payload: res});
//     },
//     err => {
//       // 修改状态
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };
// * +++++++++++++++++++++++

// *方法2： async await
// 优点： 不会形成嵌套地狱
// 缺点：稍微优点复杂，相比与普通嵌套
// const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     res => {
//       // 修改状态
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       return res;
//     },
//     err => {
//       // 修改状态
//       dispatch({type: LOGIN_FAILURE, payload: err});
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

// * +++++++++++++++++++++++

// *方法3： redux-saga
// 优点： 适合逻辑复杂的项目
// 缺点：看着有点“复杂”

export const login = userInfo => ({type: LOGIN_SAGA, payload: userInfo});
