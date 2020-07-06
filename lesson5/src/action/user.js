import LoginService from "../service/login";

// export const login = userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo});

export const login = userInfo => dispatch => {
  LoginService.login(userInfo).then(
    res => {
      dispatch({type: "LOGIN_SUCCESS", payload: res});
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};
