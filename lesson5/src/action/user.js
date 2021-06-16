import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";
import co from "co";

// export const login = (userInfo) => ({type: LOGIN_SUCCESS, payload: userInfo});

//! 异步方案1
// thunk
// 适合与请求简单，嵌套少的时候
// 缺点：容易形成嵌套地狱
// export const login = (userInfo) => (dispatch) => {
//   dispatch({type: REQUEST});
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

export const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then(
    (res) => {
      dispatch({type: LOGIN_SUCCESS, payload: res});
    },
    (err) => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};

export const loginPromise = (dispatch, userInfo) => {
  return LoginService.login(userInfo).then(
    (res) => {
      return res;
    },
    (err) => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};

//异步方案2
// async与await
// 优点： 同步的方式实现异步
// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: REQUEST});

//     // 获取用户基本信息 ajax
//     let res = await loginPromise(dispatch, userInfo);
//     // 获取用户详细信息 ajax
//     if (res) {
//       getMoreUserInfo(dispatch, res);
//     }
//   };
// }

// export function login(userInfo) {
//   return function(dispatch) {
//     return co(function*() {
//       dispatch({type: "REQUEST"});
//       // 请求1： 用户登录
//       let res1 = yield loginPromise(dispatch, userInfo);
//       // 请求2： 根据用户基本信息获取详细信息
//       if (res1) {
//         getMoreUserInfo(dispatch, res1);
//       }
//     });
//   };
// }

export const login = (userInfo) => ({type: LOGIN_SAGA, payload: userInfo});
