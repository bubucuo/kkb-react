import {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

@connect(
  ({user}) => ({isLogin: user.isLogin, err: user.err, loading: user.loading}),
  // mapDispatchToProps
  {
    login, //: (userInfo) => ({type: "LOGIN_SUCCESS", payload: userInfo}),
  }
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }
  onChange = (e) => {
    this.setState({name: e.target.value});
  };
  render() {
    const {isLogin, location, dispatch, login, err, loading} = this.props;
    const {redirect = "/"} = location.state || {};

    if (isLogin) {
      return <Redirect to={redirect} />;
    }

    const {name} = this.state;
    console.log("LoginPage", this.props); //sy-log
    return (
      <div>
        <h3>LoginPage</h3>
        <input value={name} onChange={this.onChange} />
        <p className="red">{err.msg}</p>
        <button onClick={() => login({name})}>
          {loading ? "loading。。。" : "click"}
        </button>
      </div>
    );
  }
}
export default LoginPage;
