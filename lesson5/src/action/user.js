import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, REQUEST} from "./const";
import LoginService from "../service/login";

// export const login = () => ({
//   type: LOGIN_SUCCESS
// });

// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: REQUEST});
//     const res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// 嵌套
// export const login = userInfo => dispatch => {
//   dispatch({type: REQUEST});
//   LoginService.login(userInfo).then(
//     res => {
//       // dispatch({
//       //   type: LOGIN_SUCCESS,
//       //   payload: {...userInfo, ...res}
//       // });
//       getMoreUserInfo(dispatch, {...userInfo, ...res});
//       return res;
//     },
//     err => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// export const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     res => {
//       return res;
//     },
//     err => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// const getMoreUserInfo = (dispatch, userInfo) => {
//   return LoginService.getMoreUserInfo(userInfo).then(
//     res => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: {...userInfo, ...res}
//       });
//       return res;
//     },
//     err => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

export const logout = () => ({
  type: LOGOUT_SUCCESS
});

// saga
export const login = userInfo => ({
  type: "loginSaga",
  payload: userInfo
});
