import React, {Component} from "react";
// import {Redirect} from "react-router-dom";
// import {Redirect} from "../k-react-router-dom/";

export default class HomePage extends Component {
  componentDidMount() {
    // console.log("HomePage componentDidMount"); // sy-log
  }

  componentWillUnmount() {
    // console.log("HomePage componentWillUnmount"); // sy-log
  }
  render() {
    // console.log("HomePage props", this.props); //sy-log
    // return <Redirect to="/welcome" />;
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}
