import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscirbe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscirbe) {
      this.unsubscirbe();
    }
  }

  add = () => {
    store.dispatch({
      type: "ADD"
    });
  };
  minus = () => {
    store.dispatch({
      type: "MINUS"
    });
  };

  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({type: "ADD"});
      }, 1000);
    });
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>

        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.asyAdd}>asyAdd</button>
      </div>
    );
  }
}
