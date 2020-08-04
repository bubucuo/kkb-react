import LoginService from "../service/login";

// export const login = () => ({type: "LOGIN_SUCCESS"});

// export const login = (userInfo) => {
//   return async function (dispatch) {
//     // 先去进行异步请求

//     // 把状态存下来
//   }
// }

// 用thunk处理异步
export const login = userInfo => dispatch => {
  LoginService.login(userInfo).then(
    res => {
      // dispatch({
      //   type: "LOGIN_SUCCESS",
      //   payload: {
      //     ...res
      //   }
      // });
      getMoreUserInfo(dispatch, res);
    },
    err => {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err
      });
    }
  );
};

const getMoreUserInfo = (dispatch, userInfo) => {
  return LoginService.getMoreUserInfo(userInfo).then(res => {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        ...res
      }
    });
  });
};
