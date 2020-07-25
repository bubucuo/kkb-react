import React, {Component} from "react";
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

  getControlled = () => {
    const {name} = this.props;
    const {getFieldValue, setFieldsValue} = this.context;
    return {
      value: getFieldValue(name) || "", //获取value
      onChange: event => {
        const newValue = event.target.value;
        console.log("newValue", newValue); //sy-log
        // 保存value
        setFieldsValue({[name]: newValue});
      }
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    console.log("field render"); //sy-log
    return returnChildNode;
  }
}
