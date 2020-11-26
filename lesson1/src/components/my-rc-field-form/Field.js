import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends React.Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unregisterField = this.context.registerField(this);
  }

  componentWillUnmount() {
    if (this.unregisterField) {
      this.unregisterField();
    }
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
    const returnChildNode = children;
    return React.cloneElement(returnChildNode, this.getControlled());
  }
}
