import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    // 注册 和 取消注册要成对出现
    // 订阅
    this.unRegister = this.context.setFieldEntities(this);
  }

  componentWillUnmount() {
    if (this.unRegister) {
      this.unRegister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {name} = this.props;
    const {setFieldsValue, getFieldValue} = this.context;
    return {
      value: getFieldValue(name), //"omg", //get
      onChange: (e) => {
        // set
        const newValue = e.target.value;
        // console.log("newValue", newValue); //sy-log
        setFieldsValue({[name]: newValue});
        // this.forceupdate()
      },
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}

/* <Component {...props} {...newProps} />; */
