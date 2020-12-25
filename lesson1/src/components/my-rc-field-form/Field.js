import React, {Component} from "react";
import FieldContext from "./FieldContext";

// ? 因为等下我要用某个api
export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unregisterFieldEntity = this.context.registerFieldEntity(this);
  }

  componentWillUnmount() {
    if (this.unregisterFieldEntity) {
      this.unregisterFieldEntity();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {getFieldValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name), // todo get 从数据仓库取值
      onChange: e => {
        const newValue = e.target.value;
        // todo set 修改数据仓库中的值
        setFieldsValue({[name]: newValue});
      }
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
