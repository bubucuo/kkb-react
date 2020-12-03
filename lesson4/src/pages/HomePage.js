import React, {Component} from "react";
// import {Redirect} from "react-router-dom";
import {withRouter} from "../k-react-router-dom/";

export default withRouter(
  class HomePage extends Component {
    componentDidMount() {
      // console.log("componentDidMount"); //sy-log
    }

    componentWillUnmount() {
      // console.log("componentWillUnmount"); //sy-log
    }
    render() {
      console.log("HomePage props", this.props); //sy-log
      // return <Redirect to="/welcome" />;
      return (
        <div>
          <h3>HomePage</h3>
        </div>
      );
    }
  }
);
