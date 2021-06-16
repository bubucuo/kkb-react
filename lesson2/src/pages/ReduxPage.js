import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  add = () => {
    // 修改状态
    store.dispatch({type: "ADD"});
  };

  asyAdd = () => {
    // setTimeout(() => {
    //   store.dispatch({type: "ADD"});
    // }, 1000);

    store.dispatch((dispatch, getState) => {
      console.log("gtestate0", getState()); //sy-log
      setTimeout(() => {
        dispatch({type: "ADD"});
        console.log("gtestate1", getState()); //sy-log
      }, 1000);
    });
  };

  asyPromise = () => {
    store.dispatch(Promise.resolve({type: "ADD"}));
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.asyPromise}>asyPromise</button>
      </div>
    );
  }
}
