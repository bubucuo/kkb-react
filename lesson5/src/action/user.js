import LoginService from "../service/login";
import {REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_SAGA} from "./const.js";

// export const login = userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo});

export const login = userInfo => ({type: LOGIN_SAGA, payload: userInfo});
//
// login
// getMoreUserInfo

// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: REQUEST});
//     const res = await loginPromise(dispatch, userInfo);
//     if (res) {
//       getMoreUserInfo(dispatch, res);
//     }
//   };
// }

const loginPromise = (dispatch, userInfo) => {
  return LoginService.login(userInfo).then(
    res => {
      // dispatch({type: LOGIN_SUCCESS, payload: res});
      return res;
    },
    err => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};

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

const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({type: LOGIN_SUCCESS, payload: res});
    },
    err => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};
