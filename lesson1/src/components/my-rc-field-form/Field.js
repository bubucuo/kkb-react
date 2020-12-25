import React, {Component} from "react";

// ? 因为等下我要用某个api
export default class Field extends Component {
  getControlled = () => {
    return {
      value: "omg", // todo get 从数据仓库取值
      onChange: e => {
        const newValue = e.target.value;
        // todo set 修改数据仓库中的值
        console.log("newValue", newValue); //sy-log
      }
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
