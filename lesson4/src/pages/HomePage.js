import React, {Component} from "react";

export default class HomePage extends Component {
  componentDidMount() {
    // console.log("HomePage componentDidMount"); //sy-log
  }

  componentWillUnmount() {
    // console.log("HomePage componentWillUnmount"); //sy-log
  }
  render() {
    console.log("HomePage", this.props); //sy-log
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}
