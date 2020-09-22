import React, {Component} from "react";
import FieldContext from "./FieldContext";

// 数据仓库，可以存储input的值
// 通过get可以获取数据 set可以设置修改数据

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.context.registerField(this);
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {setFieldsValue, getFieldValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name),
      onChange: e => {
        const newValue = e.target.value;
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
