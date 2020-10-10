import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

@connect(
  ({user}) => ({
    isLogin: user.isLogin,
    loading: user.loading,
    err: user.err
  }),
  // mapDispatchToProps
  {
    login //: () => ({type: "LOGIN_SUCCESS"})
  }
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }
  nameChange = e => {
    this.setState({name: e.target.value});
  };
  render() {
    // 判断是否登录
    const {isLogin, location, dispatch, login, loading, err} = this.props;
    // 登录了，就去该去的地方
    const {from = "/"} = location.state || {};
    if (isLogin) {
      return <Redirect to={from} />;
    }
    // 没登录，留在当前页面
    const {name} = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input type="text" value={name} onChange={this.nameChange} />
        <p className="red">{err.msg}</p>
        <button
          onClick={() => {
            login({name});
          }}>
          {loading ? "loading..." : "login"}
        </button>
      </div>
    );
  }
}
export default LoginPage;
