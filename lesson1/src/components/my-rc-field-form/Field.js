import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;
  componentDidMount() {
    // 把当前组件记录到formStore中
    this.context.registerField(this);
  }
  getControlled = childProps => {
    const {name} = this.props;
    const {getFieldValue, setFieldsValue} = this.context;
    return {
      // ...childProps,
      value: getFieldValue(name),
      onChange: event => {
        const newValue = event.target.value;
        setFieldsValue({[name]: newValue});
      }
    };
  };

  onStoreChange = () => {
    this.forceUpdate();
  };

  render() {
    const {children} = this.props;

    const returnChildNode = React.cloneElement(
      children,
      this.getControlled(children.props)
    );

    return returnChildNode;
  }
}
