import React, {Component} from "react";
import FieldContext from "./FieldContext";

class Field extends Component {
  // contextType只能用在类组件以及只能订阅单一的context来源
  static contextType = FieldContext;

  componentDidMount() {
    this.unregister = this.context.registerFieldEntities(this);
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled() {
    const {getFieldValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name), //"omg", //get从状态管理库取值
      onChange:
        typeof this.props.children.props.onChange === "function"
          ? this.props.children.props.onChange
          : (e) => {
              const newValue = e.target.value;
              // set 修改状态管理库的值
              setFieldsValue({[name]: newValue});
            },
    };
  }

  render() {
    const {children} = this.props;
    // return children;
    return React.cloneElement(children, this.getControlled());
  }
}
export default Field;

// ! 函数组件
// export default function Field(props) {
//   const {children, name} = props;
//   const context = useContext(FieldContext);

//   const [, forceUpdate] = useReducer((x) => x + 1, 0);

//   useLayoutEffect(() => {
//     const unRegister = context.setFieldEntities({
//       props,
//       onStoreChange,
//     });
//     return () => {
//       unRegister();
//     };
//   }, []);

//   const onStoreChange = () => {
//     // 强制更新组件
//     forceUpdate();
//   };

//   const getControlled = () => {
//     const {getFieldValue, setFieldsValue} = context;
//     return {
//       value: getFieldValue(name), // get
//       onChange: (e) => {
//         // set
//         const newValue = e.target.value;
//         setFieldsValue({[name]: newValue});
//         console.log("newValue", newValue);
//       },
//     };
//   };

//   // 克隆组件，给其加一些属性在返回，使Field=>Input变成受控组件
//   const returnChildNode = React.cloneElement(children, getControlled());
//   return returnChildNode;
// }
