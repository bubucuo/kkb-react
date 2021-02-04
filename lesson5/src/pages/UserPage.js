import {Component} from "react";
import {connect} from "react-redux";

@connect(({user}) => ({user}))
class UserPage extends Component {
  render() {
    const {user} = this.props;
    console.log("UserPage", user.userInfo); //sy-log
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;
