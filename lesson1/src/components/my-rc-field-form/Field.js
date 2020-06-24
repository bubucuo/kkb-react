import React, {Component, cloneElement} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;
  componentDidMount() {
    this.cancelRegister = this.context.registerField(this);
  }

  componentWillUnmount() {
    if (this.cancelRegister) {
      this.cancelRegister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };
  getControled = () => {
    const {getFieldValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name), //从store中取值
      onChange: e => {
        // 把新的参数值存到store中
        const newValue = e.target.value;
        setFieldsValue({[name]: newValue});
        console.log("newValue", newValue); //sy-log
      }
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControled());
    return returnChildNode;
  }
}
