import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

@connect(
  ({user}) => ({isLogin: user.isLogin, err: user.err}),
  // mapdispatchToProps
  {
    login,
    // : (userInfo) => ({type: "LOGIN_SUCCESS", payload: userInfo}),
  }
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  render() {
    const {isLogin, location, dispatch, login, err} = this.props;
    const {from = "/"} = location.state || {};

    // 已经登录了
    if (isLogin) {
      return <Redirect to={from} />;
    }

    const {name} = this.state;
    // 没有登录
    return (
      <div>
        <h3>LoginPage</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <p className="red">{err.msg}</p>
        <button onClick={() => login({name})}>login</button>
      </div>
    );
  }
}
export default LoginPage;
