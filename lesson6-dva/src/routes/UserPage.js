import { Component } from "react";
import { connect } from "dva";

@connect(state => {
  console.log("state", state); //sy-log
  return state;
})
class UserPage extends Component {
  render() {
    console.log("props", this.props); //sy-log
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;
