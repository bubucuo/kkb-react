import React, {Component} from "react";

export default class HomePage extends Component {
  render() {
    console.log("props", this.props); //sy-log
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}
