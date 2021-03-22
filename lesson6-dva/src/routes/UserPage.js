import { Component } from "react";
import { connect } from "dva";

@connect(state => {
  console.log("总的state", state); //sy-log
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
