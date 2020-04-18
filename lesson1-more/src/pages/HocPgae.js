import React, {Component} from "react";

// 是个函数, 参数是组件, 返回值也是组件

function Child(props) {
  return <div className="border">child-{props.name}</div>;
}

const foo = () => {};

export default class HocPgae extends Component {
  render() {
    return (
      <div>
        <h3>HocPgae</h3>
      </div>
    );
  }
}
