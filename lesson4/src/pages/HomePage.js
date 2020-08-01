import React, {Component} from "react";
import {Redirect} from "../k-react-router-dom/";

export default class HomePage extends Component {
  render() {
    console.log("props", this.props); //sy-log
    return (
      <Redirect
        to={{
          pathname: "/welcome"
        }}
      />
    );
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}
