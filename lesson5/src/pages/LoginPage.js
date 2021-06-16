import {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {LOGIN_SUCCESS} from "../action/const";
import {login} from "../action/user";

export default connect(
  ({user}) => ({isLogin: user.isLogin, err: user.err, loading: user.loading}),
  {
    login,
  }
)(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {name: ""};
    }
    render() {
      const {isLogin, location, dispatch, login, err, loading} = this.props;
      // 登录
      if (isLogin) {
        const {from = "/"} = location.state || {};
        return <Redirect to={from} />;
      }
      // 没有登录
      const {name} = this.state;
      return (
        <div>
          <h3>LoginPage</h3>
          <input
            value={name}
            onChange={(e) => {
              this.setState({name: e.target.value});
            }}
          />
          <p className="red">{err.msg}</p>
          <button onClick={() => login({name})}>
            {loading ? "loading..." : "click"}
          </button>
        </div>
      );
    }
  }
);
