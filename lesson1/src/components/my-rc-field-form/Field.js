import React, {Component, cloneElement} from "react";
import FieldContext from "./FieldContext";

// 因为方便，等下用contextType，也可以用函数组件 ，自己选择吧
export default class Field extends Component {
  static contextType = FieldContext;
  componentDidMount() {
    const {registerField} = this.context;
    this.unregisterField = registerField(this);
  }

  componentWillUnmount() {
    if (this.unregisterField) {
      this.unregisterField();
    }
  }

  // store变化，执行这个刷新方法
  onStoreChange = () => {
    this.forceUpdate();
  };
  getControlled = () => {
    const {name} = this.props;
    const {getFieldValue, setFieldsValue} = this.context;
    return {
      value: getFieldValue(name), //"omg", //比如说个仓库可以存储这个value，那这里直接get
      onChange: event => {
        const newValue = event.target.value;
        console.log("newValue", newValue); //sy-log
        // 想要重新设置input value， 那执行仓库的set函数就可以了吧
        // 设置对象，name是个变量
        setFieldsValue({[name]: newValue});
      }
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
