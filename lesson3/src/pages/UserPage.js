import React, {Component} from "react";

export default class UserPage extends Component {
  componentDidMount() {
    console.log("didmount"); //sy-log
  }
  componentWillUnmount() {
    console.log("ummount"); //sy-log
  }

  render() {
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
