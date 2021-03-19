import {LOGIN_FAILURE, LOGIN_SUCCESS, REQUEST} from "./const";
import LoginService from "../service/login";
import co from "co";
// export const login = (userInfo) => ({
//   type: LOGIN_SUCCESS,
//   payload: {...userInfo},
// });

// ! 异步解决方案
// * 方案1 redux-thunk
// 优点: 使用简单
// 缺点：容易形成嵌套地狱
// export const login = (userInfo) => (dispatch) => {
//   LoginService.login(userInfo).then(
//     (res) => {
//       // dispatch({type: LOGIN_SUCCESS, payload: {...res}});
//       getMoreUserInfo(dispatch, res);
//     },
//     (err) => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

// * 方案1和2都要用
export const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then(
    (res) => {
      dispatch({type: "LOGIN_SUCCESS", payload: res});
    },
    (err) => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};

export const loginPromise = (dispatch, userInfo) => {
  return LoginService.login(userInfo).then(
    (res) => {
      // dispatch({type: "LOGIN_SUCCESS", payload: res});
      return res;
    },
    (err) => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};

// * 方案2 async await 是generator的语法糖
// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: REQUEST});
//     let res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// *generator
export function login(userInfo) {
  return function(dispatch) {
    return co(function*() {
      dispatch({type: REQUEST});
      let res1 = yield loginPromise(dispatch, userInfo);
      if (res1) {
        getMoreUserInfo(dispatch, res1);
      }
    });
  };
}
