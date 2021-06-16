import {Component} from "react";
import {connect} from "react-redux";

@connect(({user}) => ({user}))
class UserPage extends Component {
  render() {
    console.log("userInfo", this.props.user.userInfo); //sy-log
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;
