import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

// 在这里做权限，路由守卫
// 常见的权限做法：一个是弹窗、路由跳转
// 以登录为例
function PrivateRoute({isLogin, component: Component, ...restProps}) {
  return (
    <Route
      {...restProps}
      render={(props) =>
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
}
export default connect(({user}) => ({isLogin: user.isLogin}))(PrivateRoute);
