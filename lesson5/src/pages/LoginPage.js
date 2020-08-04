import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

export default connect(
  // mapStateToProps 把state映射到props上
  // ({user}) => ({isLogin: user.isLogin}),
  state => {
    return {
      isLogin: state.user.isLogin,
      loading: state.user.loading,
      err: state.user.err
    };
  },
  // mapDispatchToProps
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
      const {isLogin, location, dispatch, login, loading, err} = this.props;
      if (isLogin) {
        // 已经登录的话 从哪儿来的 回哪儿去；找不到从哪儿来，一般情况回去首页
        const {from = "/"} = location.state || {};
        return <Redirect to={from} />;
      }
      // 如果没有登录
      const {name} = this.state;
      return (
        <div>
          <h3>LoginPage</h3>
          <input onChange={this.nameChange} value={name} />
          <p className="red">{err.msg}</p>
          <button onClick={() => login({name})}>
            {loading ? "loading..." : "click"}
          </button>
        </div>
      );
    }
  }
);
