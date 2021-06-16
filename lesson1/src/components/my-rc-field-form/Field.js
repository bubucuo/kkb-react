import React, {Component} from "react";
import FieldContext from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unregister = this.context.setFieldEntities(this);
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {name} = this.props;
    const {getFieldValue, setFieldsValue} = this.context;
    return {
      value: getFieldValue(name), //"omg", //get(name) store
      onChange: (e) => {
        const newVal = e.target.value;
        // store set（name）
        setFieldsValue({[name]: newVal});
        // console.log("newVal", newVal); //sy-log
      },
    };
  };

  render() {
    console.log("render"); //sy-log
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
export default Field;
