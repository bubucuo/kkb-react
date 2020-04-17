import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {registerField} = this.context;
    registerField(this);
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = childProps => {
    const {name} = this.props;
    const {getFieldValue, setFieldsValue} = this.context;
    // const
    return {
      ...childProps,
      value: getFieldValue(name),
      onChange: event => {
        const newwValue = event.target.value;
        setFieldsValue({[name]: newwValue});
      }
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(
      children,
      this.getControlled(children.props)
    );
    // console.log("Field render"); //sy-log
    return <React.Fragment>{returnChildNode}</React.Fragment>;
  }
}
