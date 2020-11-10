import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

// 路由守卫 ，
// 判断登录
// 登录了： 该去哪儿去哪儿
// 没有登录：去loginPage，并且携带参数，方便登录之后再自动做跳转
export default connect(
  // mapStateToProps
  ({user}) => ({isLogin: user.isLogin})
  // mapDispatchToProps
)(function PrivateRoute({isLogin, component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: "/login", state: {from: props.location.pathname}}}
          />
        )
      }
    />
  );
});
