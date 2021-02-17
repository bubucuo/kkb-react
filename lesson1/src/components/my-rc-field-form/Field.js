import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unregisterEntity = this.context.registerEntity(this);
  }

  componentWillUnmount() {
    if (this.unregisterEntity) {
      this.unregisterEntity();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getCntrolled = () => {
    const {getFieldValue, setFieldValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name), //"omg", // 从formStore当中读取数据
      onChange: e => {
        const newValue = e.target.value;
        // 设置formStore的数据
        setFieldValue({[name]: newValue});
      }
    };
  };
  render() {
    const {children} = this.props;
    return React.cloneElement(children, this.getCntrolled());
  }
}
