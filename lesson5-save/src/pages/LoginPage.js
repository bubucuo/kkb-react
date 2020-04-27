import React, {Component} from "react";
import {Redirect} from "react-router-dom/";
import {connect} from "react-redux";
import {login} from "../action/user";

export default connect(
  ({user}) => ({isLogin: user.isLogin, loading: user.loading, err: user.err}),
  {
    login
  }
)(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {name: ""};
    }

    nameChange = event => {
      this.setState({name: event.target.value});
    };
    render() {
      const {isLogin, loading, location, login, err} = this.props;
      const {redirect = "/"} = location.state || {};
      if (isLogin) {
        return <Redirect to={redirect} />;
      }
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
);
