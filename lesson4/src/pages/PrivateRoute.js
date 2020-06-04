import React from "react";
// import {Route, Redirect} from "react-router-dom";
import {Route, Redirect} from "../k-react-router-dom/";

import {connect} from "react-redux";

export default connect(
  // mapStateToProps
  ({user}) => ({isLogin: user.isLogin})
)(function PrivateRoute({isLogin, component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {redirect: props.location.pathname}
            }}
          />
        )
      }
    />
  );
});

// 路由守卫
// 比如userPage  那就用PrivateRoute包裹起来 其实就加了个是否登录的判断
