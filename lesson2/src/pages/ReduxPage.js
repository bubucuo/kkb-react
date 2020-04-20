import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      // console.log("change"); //sy-log
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch({type: "ADD", payload: 100});
  };

  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        // console.log("now ", getState()); //sy-log
        dispatch({type: "ADD", payload: 1});
      }, 1000);
    });
  };

  render() {
    return (
      <div className="border">
        <h3>ReduxPage</h3>
        <div>{store.getState()}</div>
        <button onClick={this.add}>add</button>

        <button onClick={this.asyAdd}>asyAdd</button>
      </div>
    );
  }
}
