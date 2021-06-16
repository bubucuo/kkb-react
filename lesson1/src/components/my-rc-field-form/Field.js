import React, {Component} from "react";
import FieldContext from "./FieldContext";
export default class Field extends Component {
  static contextType = FieldContext;
  componentDidMount() {
    this.unregisterFieldEntities = this.context.registerFieldEntities(this);
  }

  componentWillUnmount() {
    this.unregisterFieldEntities();
  }
  onStoreChange = () => {
    this.forceUpdate();
  };
  getControlled = () => {
    const {getFieldValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name), // get
      onChange: (e) => {
        const newValue = e.target.value;
        // set
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
