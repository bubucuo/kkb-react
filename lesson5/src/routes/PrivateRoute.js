// 校验登录
// 登录的话 直接按照原先的值跳转走

import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

// 没有登录  则跳去登录页
export default connect(
  // mapStateToProps
  ({user}) => ({
    isLogin: user.isLogin,
  })
)(function PrivateRoute({isLogin, path, component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "./login",
              state: {from: props.location.pathname},
            }}
          />
        )
      }
    />
  );
});
