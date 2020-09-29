import React, {Component} from "react";
import {Redirect} from "react-router-dom/";

export default class HomePage extends Component {
  render() {
    // return (
    //   <Redirect
    //     to={{
    //       pathname: "/welcome"
    //     }}
    //   />
    // );
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}
