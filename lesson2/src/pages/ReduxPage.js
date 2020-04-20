import React, {Component} from "react";
import store from "../store/";

//  todo 1. type统一管理
//  todo 2. 事件副作用不建议直接写在页面

export default class ReduxPage extends Component {
  componentDidMount() {
    // store里的state发生变化 则执行订阅的callback
    // 也就是dispatch执行后 会执行订阅的callback
    this.unsubscribe = store.subscribe(() => {
      // console.log("change"); //sy-log
      this.forceUpdate();
    });
    // store.subscribe(() => {
    //   console.log("change2"); //sy-log
    // });
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
      // console.log("get", getState()); //sy-log
      setTimeout(() => {
        dispatch({type: "ADD", payload: 1});
        // console.log("get", getState()); //sy-log
      }, 1000);
    });
    // next next()
  };

  promiseMinus = () => {
    store.dispatch(Promise.resolve({type: "MINUS", payload: 100}));
  };
  render() {
    console.log("get", store.getState()); //sy-log
    return (
      <div className="border">
        <h3>ReduxPage</h3>
        <div>{store.getState().home}</div>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>

        <button onClick={this.promiseMinus}>promiseMinus</button>
      </div>
    );
  }
}
