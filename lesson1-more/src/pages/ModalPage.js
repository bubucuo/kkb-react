import React, {Component} from "react";
import Modal from "../components/Modal";

export default class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  setModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  render() {
    const {showModal} = this.state;
    return (
      <div>
        <h3>ModalPage</h3>
        <button onClick={this.setModal}>toggle</button>
        {showModal && <Modal />}
      </div>
    );
  }
}
