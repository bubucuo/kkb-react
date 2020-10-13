import React, { Component } from "react";
import { connect } from "dva";

@connect(
  // mapStateToProps
  state => {
    // 这个state是总的state
    console.log("state", state); //sy-log
    return { user: state.user };
  }
)
class UserPage extends Component {
  render() {
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;
