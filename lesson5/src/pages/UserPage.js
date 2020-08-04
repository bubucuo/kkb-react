import React, {Component} from "react";
import {connect} from "react-redux";

export default connect(({user}) => ({user}))(
  class UserPage extends Component {
    render() {
      const {user} = this.props;
      const {id, name, score} = user.userInfo;
      return (
        <div>
          <h3>UserPage</h3>
          <p>id:{id}</p>
          <p>name:{name}</p>
          <p>score:{score}</p>
        </div>
      );
    }
  }
);
