import { connect } from "dva";
import { Component } from "react";

@connect(state => {
  console.log("user state", state); //sy-log
  return { user: state.user };
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
