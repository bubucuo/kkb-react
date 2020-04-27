import {
  LOGOUT_SUCCESS,
  REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_SAGA
} from "./const";
import LoginService from "../service/login";

export const logout = () => ({type: LOGOUT_SUCCESS});

export const login = userInfo => ({type: LOGIN_SAGA, payload: userInfo});

// export const login = userInfo => ({type: LOGIN_SUCCESS, payload: userInfo});

// export function login(userInfo) {
//   return async function(dispatch) {
//     // 显示loading
//     dispatch({
//       type: REQUEST
//     });

//     const res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// export const login = userInfo => dispatch => {
//   dispatch({
//     type: REQUEST
//   });
//   LoginService.login(userInfo).then(
//     res => {
//       // dispatch({
//       //   type: LOGIN_SUCCESS,
//       //   payload: res
//       // });
//       getMoreUserInfo(dispatch, res);
//     },
//     err => {
//       dispatch({
//         type: LOGIN_FAILURE,
//         payload: err
//       });
//     }
//   );
// };

// export const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     res => {
//       // dispatch({
//       //   type: LOGIN_SUCCESS,
//       //   payload: res
//       // });
//       return res;
//     },
//     err => {
//       dispatch({
//         type: LOGIN_FAILURE,
//         payload: err
//       });
//     }
//   );
// };

// export const getMoreUserInfo = (dispatch, userInfo) => {
//   return LoginService.getMoreUserInfo(userInfo).then(
//     res => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res
//       });
//     },
//     err => {
//       dispatch({
//         type: LOGIN_FAILURE,
//         payload: err
//       });
//     }
//   );
// };
