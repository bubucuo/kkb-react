import React from "react";
import {Route, Redirect} from "react-router";
import {connect} from "react-redux";

// 路由守卫
// * 权限判断
// isLogin 登录  正常去component
// 没有登录 去login登录， 登录成功之后再跳回 component
export default connect(
  // mapStateToPorps
  ({user}) => ({isLogin: user.isLogin})
)(function PrivateRoute({isLogin, path, component: Component, ...restProps}) {
  return (
    <Route
      {...restProps}
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
