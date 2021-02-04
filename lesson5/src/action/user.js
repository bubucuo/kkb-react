import LoginService from "../service/login";

// export const login = (userInfo) => ({type: "LOGIN_SUCCESS", payload: userInfo});
// ! 异步解决方案

// 方案1：使用中间件redux-thunk
// 优点： 使用简单
// 缺点：容易陷入嵌套地狱
export const login = (userInfo) => (dispatch) => {
  dispatch({type: "REQUEST"});
  LoginService.login(userInfo).then(
    (res) => {
      // dispatch({type: "LOGIN_SUCCESS", payload: res});
      getMoreUserInfo(dispatch, res);
    },
    (err) => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};

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

// 方案2：
