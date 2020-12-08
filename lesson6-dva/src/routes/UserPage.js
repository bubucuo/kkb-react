import React, { Component } from "react";
import { connect } from "dva";

@connect(state => {
  console.log("user state", state); //sy-log
  return state;
})
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
