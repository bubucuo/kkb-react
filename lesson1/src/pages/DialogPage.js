import React, {Component} from "react";
import Dialog from "../components/Dialog";

export default class DialogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false
    };
  }
  toggle = () => {
    this.setState({showDialog: !this.state.showDialog});
  };
  render() {
    return (
      <div className="dialogPage">
        <h3>DialogPage</h3>
        <button onClick={this.toggle}>click</button>
        {this.state.showDialog && <Dialog />}
      </div>
    );
  }
}
