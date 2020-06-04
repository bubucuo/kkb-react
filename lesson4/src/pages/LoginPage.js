import React, {Component} from "react";
// import {Route, Redirect} from "react-router-dom";
import {Route, Redirect} from "../k-react-router-dom/";
import {connect} from "react-redux";

export default connect(
  // mapStateToProps
  ({user}) => ({isLogin: user.isLogin}),
  // mapDispatchToProps
  {
    login: () => ({type: "LOGIN_SUCCESS"})
  }
)(
  class LoginPage extends Component {
    render() {
      const {isLogin, location, login} = this.props;
      const {redirect = "/"} = location.state || {};
      if (isLogin) {
        return <Redirect to={redirect} />;
      }
      return (
        <div>
          <h3>LoginPage</h3>
          <button onClick={login}>click login</button>
        </div>
      );
    }
  }
);
