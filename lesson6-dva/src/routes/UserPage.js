import { Component } from "react";
import { connect } from "dva";

@connect(state => {
  return { ...state };
})
class UserPage extends Component {
  render() {
    console.log("user props", this.props); //sy-log
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;
