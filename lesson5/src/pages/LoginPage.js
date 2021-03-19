import {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {LOGIN_SUCCESS} from "../action/const";
import {login} from "../action/user";

@connect(
  ({user}) => ({isLogin: user.isLogin, err: user.err, loading: user.loading}),
  // mapDispatchToProps
  {
    login,
  }
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
    //
    const {isLogin, dispatch, login, err, loading} = this.props;
    // 已经登录，跳转走
    if (isLogin) {
      const {location} = this.props;
      const {from = "/"} = location.state || {};
      return <Redirect to={from} />;
    }
    // 没有登录，留在当前页
    const {name} = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input type="text" value={name} onChange={this.nameChange} />
        <button onClick={() => login({name})}>
          {loading ? "loading..." : "login"}
        </button>
        <p className="red">{err.msg}</p>
      </div>
    );
  }
}
export default LoginPage;
