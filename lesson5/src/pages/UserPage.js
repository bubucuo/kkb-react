import React, {Component} from "react";
import {connect} from "react-redux";

@connect(({user}) => ({user}))
class UserPage extends Component {
  render() {
    const {user} = this.props;
    const {id, name} = user.userInfo;
    return (
      <div>
        <h3>UserPage</h3>
        <p>id: {id}</p>
        <p>name: {name}</p>
      </div>
    );
  }
}
export default UserPage;
