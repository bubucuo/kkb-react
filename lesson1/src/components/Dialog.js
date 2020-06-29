import React, {Component} from "react";
import {createPortal} from "react-dom";

export default class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dialog">
        <h3>Dialog</h3>
      </div>
    );
  }
}
