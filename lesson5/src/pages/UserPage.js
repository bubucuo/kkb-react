import React, {Component} from "react";
import {connect} from "react-redux";

export default connect(({user}) => ({user}))(
  class UserPage extends Component {
    render() {
      // console.log("UserPage", this.props); //sy-log
      const {user} = this.props;
      const {userInfo} = user;
      return (
        <div>
          <h3>UserPage</h3>
          <p>id: {userInfo.id}</p>
          <p>name: {userInfo.name}</p>
          <p>score: {userInfo.score}</p>
        </div>
      );
    }
  }
);
