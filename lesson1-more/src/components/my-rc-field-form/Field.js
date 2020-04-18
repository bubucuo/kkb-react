import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    const {registerField} = this.context;
    this.cancelRegisterField = registerField(this);
  }

  componentWillUnmount() {
    if (this.cancelRegisterField) {
      this.cancelRegisterField();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {name} = this.props;
    const {getFiledValue, setFieldsValue} = this.context;

    return {
      value: getFiledValue(name), //取数据
      onChange: event => {
        // 存数据
        const newValue = event.target.value;
        setFieldsValue({[name]: newValue});
      }
    };
  };

  render() {
    console.log("field render"); //sy-log
    const {children} = this.props;

    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
