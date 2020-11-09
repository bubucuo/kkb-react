import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {LOGIN_SUCCESS} from "../action/const";
import {login} from "../action/user";

@connect(
  state => ({
    isLogin: state.user.isLogin,
    err: state.user.err,
    loading: state.user.loading
  }),
  {
    login
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
    const {isLogin, location, dispatch, login, err, loading} = this.props;
    const {from = "/"} = location.state || {};
    if (isLogin) {
      return <Redirect to={from} />;
    }
    const {name} = this.state;

    return (
      <div>
        <h3>LoginPage</h3>
        <input type="text" value={name} onChange={this.nameChange} />
        <p className="red">{err.msg}</p>
        <button onClick={() => login({name})}>
          {loading ? "loading..." : "click login"}
        </button>
      </div>
    );
  }
}
export default LoginPage;
