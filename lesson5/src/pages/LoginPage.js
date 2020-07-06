import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

export default connect(
  ({user}) => ({
    isLogin: user.isLogin,
    loading: user.loading,
    err: user.err
  }),
  {
    login
  }
)(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {name: ""};
    }
    nameChange = e => {
      this.setState({name: e.target.value});
    };
    render() {
      const {isLogin, location, login, err} = this.props;
      console.log("LoginPage", this.props); //sy-log
      if (isLogin) {
        // 已经登录了
        const {from = "/"} = location.state || {};
        return <Redirect to={from} />;
      }
      // 没有登录的话 展示登录页面
      const {name} = this.state;
      return (
        <div>
          <h3>LoginPage</h3>
          <input type="text" value={name} onChange={this.nameChange} />
          <button onClick={() => login({name})}>click login</button>
          <p className="red">{err.msg}</p>
        </div>
      );
    }
  }
);
