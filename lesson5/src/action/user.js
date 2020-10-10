import LoginService from "../service/login";
import {LOGIN_SUCCESS, REQUEST, LOGIN_FAILURE, LOGIN_SAGA} from "./const";

// 同步
// export const login = userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo});

// todo 实现异步1：redux-thunk， 优点就是简单，缺点就是对于复杂逻辑，容易形成嵌套地狱
// export const login = userInfo => dispatch => {
//   dispatch({type: REQUEST});
//   LoginService.login(userInfo).then(
//     res => {
//       // dispatch({type: LOGIN_SUCCESS, payload: res});
//       getMoreUserInfo(res, dispatch);
//     },
//     err => {
//       dispatch({type: LOGIN_FAILURE, payload: err});
//     }
//   );
// };

export const getMoreUserInfo = (userInfo, dispatch) => {
  return LoginService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({type: LOGIN_SUCCESS, payload: res});
    },
    err => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};

// todo 实现异步2：async await， 优点就是简单，缺点就是没有generator功能丰富，async await是generator的语法糖
// 同步的方式来实现异步
// export const login = userInfo => {
//   // loginPromise(userInfo, dispatch)
//   return async function(dispatch) {
//     dispatch({type: REQUEST});
//     // 1.先执行登录
//     let res1 = await loginPromise(userInfo, dispatch);
//     console.log("res1", res1); //sy-log
//     // 2. 根据登录的id获取详细信息
//     if (res1) {
//       getMoreUserInfo(res1, dispatch);
//     }
//   };
// };

export const loginPromise = (userInfo, dispatch) => {
  return LoginService.login(userInfo).then(
    res => {
      return res;
    },
    err => {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  );
};

// todo 实现异步3： redux-saga，优点：优雅、功能强大 ，缺点： ”麻烦“
export const login = userInfo => ({type: LOGIN_SAGA, payload: userInfo});
