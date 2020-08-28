import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  add = () => {
    // 修改状态
    store.dispatch({type: "ADD"});
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
      </div>
    );
  }
}
