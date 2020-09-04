import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

// 1、location 从哪来?  location是route props的
// 2、connect 的参数

// mapStateToProps 把store state映射到props上
// mapDispatchToProps 把dispatch映射到props上
// 3、为什么dispatch 之后页面就跳转了？
@connect(
  ({user}) => ({isLogin: user.isLogin, loading: user.loading, err: user.err}),
  {
    login //: userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo})
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
    const {isLogin, location, dispatch, login, loading, err} = this.props;
    // 登录
    if (isLogin) {
      const {from = "/"} = location.state || {};
      return <Redirect to={from} />;
    }
    const {name} = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input value={name} onChange={this.nameChange} />
        <button onClick={() => login({name})}>
          {loading ? "loading..." : "login"}
        </button>
        <p className="red">{err.msg}</p>
      </div>
    );
  }
}

export default LoginPage;
