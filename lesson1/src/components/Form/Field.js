import React, {Component, useState, useEffect} from "react";
import FieldContext, {HOOK_MARK} from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;
  constructor(props) {
    super(props);
    this.state = {resetCount: 0};
  }
  componentDidMount() {
    const {getInternalHooks} = this.context;
    const {registerField} = getInternalHooks(HOOK_MARK);
    this.cancelRegisterFunc = registerField(this);
  }

  componentWillUnmount() {
    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc();
    }
    this.destory = true;
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getValue = () => {
    const {name} = this.props;
    const {getFieldValue} = this.context;
    return {[name]: getFieldValue[name]};
  };

  getControlled = childprops => {
    const {getInternalHooks, getFieldValue} = this.context;
    const {dispatch} = getInternalHooks(HOOK_MARK);
    const {name} = this.props;

    const control = {
      ...childprops,
      value: getFieldValue(name) || "",
      onChange: event => {
        const newValue = event.target.value;
        console.log("onchangce", newValue); //sy-log
        dispatch(
          {type: "updateValue", name, value: newValue},
          this.onStoreChange
        );
      }
    };
    return control;
  };

  render() {
    const {resetCount} = this.state;
    const {children} = this.props;

    const controlledProps = this.getControlled(children.props);

    const returnChildNode = React.cloneElement(children, controlledProps);

    console.log("Field render", returnChildNode); //sy-log

    return <React.Fragment key={resetCount}>{returnChildNode}</React.Fragment>;
  }
}

export default function WrapperField(props) {
  return <Field key={props.name} {...props} />;
}
