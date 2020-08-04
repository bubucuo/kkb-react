import React from "react";
import {Route, Redirect} from "react-router-dom";
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
            to={{pathname: "/login", state: {from: props.location.pathname}}}
          />
        )
      }
    />
  );
});
