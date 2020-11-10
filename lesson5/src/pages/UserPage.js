import React, {Component} from "react";
import {connect} from "react-redux";

@connect(({user}) => ({user}))
class UserPage extends Component {
  render() {
    const {user} = this.props;
    const {userInfo} = user;
    return (
      <div>
        <h3>UserPage</h3>
        <p>name: {userInfo.name}</p>
        <p>id: {userInfo.id}</p>
        <p>score: {userInfo.score}</p>
      </div>
    );
  }
}
export default UserPage;
