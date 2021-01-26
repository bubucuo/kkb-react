import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;
  getControlled = () => {
    const {name} = this.props;
    const {setFieldsValue, getFieldValue} = this.context;
    return {
      value: getFieldValue(name), //"omg", //get
      onChange: (e) => {
        // set
        const newValue = e.target.value;
        console.log("newValue", newValue); //sy-log
        setFieldsValue({[name]: newValue});
      },
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
