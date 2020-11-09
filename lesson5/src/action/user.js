import LoginService from "../service/login";

// export const login = userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo});

// ----------------------------------------
// ! 异步方法1：redux-thunk
//  redux-thun 缺点就是 容易形成嵌套地狱
// export const login = userInfo => dispatch => {
//   dispatch({type: "REQUEST"});
//   LoginService.login(userInfo).then(
//     res => {
//       // dispatch({type: "LOGIN_SUCCESS", payload: res});
//       // 异步请求嵌套
//       getMoreUserInfo( dispatch, res);
//     },
//     err => {
//       dispatch({type: "LOGIN_FAILURE", payload: err});
//     }
//   );
// };

export const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({type: "LOGIN_SUCCESS", payload: res});
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};

// export const login = userInfo => {
//   return dispatch => loginPromise(dispatch, userInfo);
// };

// function loginPromise(dispatch, userInfo) {
//   LoginService.login(userInfo).then(res => {
//     dispatch({type: "LOGIN_SUCCESS", payload: res});
//   });
// }

// ----------------------------------------

export const loginPromise = (dispatch, userInfo) => {
  return LoginService.login(userInfo).then(
    res => {
      return res;
      // dispatch({type: "LOGIN_SUCCESS", payload: res});
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};

// ----------------------------------------
// !方法2：async await优点就是简单，本质上还是generator，只是没有generator强大
// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: "REQUEST"});
//     let res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }
// ----------------------------------------

// ----------------------------------------
// !方法3：redux-saga
export const login = userInfo => ({type: "LOGIN_SAGA", payload: userInfo});

// ----------------------------------------
