import { connect } from "dva";
import React, { Component } from "react";

@connect(state => {
  return { state };
})
class UserPage extends Component {
  render() {
    console.log("stae", this.props); //sy-log
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;
