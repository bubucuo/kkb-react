import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

export default connect(({user}) => ({isLogin: user.isLogin}))(
  function PrivateRoute({isLogin, component: Component, ...restProps}) {
    // if()login <Component {...props} />
    // else
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
