import {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

@connect(
  ({user}) => ({isLogin: user.isLogin, err: user.err, loading: user.loading}),
  {login}
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }
  nameChange = (e) => {
    this.setState({name: e.target.value});
  };
  render() {
    const {isLogin, location, dispatch, login, err, loading} = this.props;
    // 1. 已经登录
    if (isLogin) {
      const {from = "/"} = location.state || {};
      return <Redirect to={from} />;
    }
    // 2. 没有登录
    const {name} = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input type="text" value={name} onChange={this.nameChange} />
        <p className="red">{err.msg}</p>
        <button onClick={() => login({name})}>
          {loading ? "loading..." : "login"}
        </button>
      </div>
    );
  }
}
export default LoginPage;
