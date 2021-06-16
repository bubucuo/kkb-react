import {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

// mapStatetoProps(getState())
@connect(
  ({user}) => ({isLogin: user.isLogin, err: user.err, loading: user.loading}),
  {login}
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }

  handleChange = (e) => {
    const name = e.target.value;
    this.setState({name});
  };

  render() {
    const {isLogin, location, dispatch, login, err, loading} = this.props;
    const {from = "/"} = location.state || {};
    console.log("LoginPage props", this.props); //sy-log
    if (isLogin) {
      // 已经登录了，就跳转走，比如去首页
      // 不能go()
      return <Redirect to={from} />;
    }
    // 没有登录，留下来，登录！
    const {name} = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input type="text" value={name} onChange={this.handleChange} />
        <p className="red">{err.msg}</p>
        <button onClick={() => login({name})}>
          {loading ? "loading..." : "login"}
        </button>
      </div>
    );
  }
}
export default LoginPage;
