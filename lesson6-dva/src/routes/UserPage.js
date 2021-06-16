import { Component } from "react";
import { connect } from "dva";

export default connect(state => {
  console.log("user state", state); //sy-log
  return { state };
})(
  class UserPage extends Component {
    render() {
      console.log("UserPage props", this.props); //sy-log
      return (
        <div>
          <h3>UserPage</h3>
        </div>
      );
    }
  }
);
