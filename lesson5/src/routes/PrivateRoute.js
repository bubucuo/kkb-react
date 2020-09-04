import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

// 做路由守卫，意思就是跳转路由前加个判断
// 以登录为例： 登录的话，直接走
// 没有登录的话，去登陆页面，同时把当前地址记录下来
export default connect(({user}) => ({isLogin: user.isLogin}))(
  function PrivateRoute({isLogin, path, component: Component, ...restProps}) {
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
  }
);
