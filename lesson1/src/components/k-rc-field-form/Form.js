import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

function Form({form, children, onFinish, onFinishFailed}, ref) {
  const [instance] = useForm(form);
  console.log("instance------", instance); //sy-log
  React.useImperativeHandle(ref, () => instance);

  instance.setCallbacks({onFinish, onFinishFailed});
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        instance.submit();
      }}>
      <FieldContext.Provider value={instance}>{children}</FieldContext.Provider>
    </form>
  );
}
export default Form;

// context使用三部走
// 1.  创建context对象 React.createConetxt
// 2. 通过Provider传递需要跨层级传递的数据value Context.Provdier
// 3. 子组件消费value
//    contextType 只能用在子组件以及只能订阅单一的context来源
//    useContext 只能用在函数组件和自定义hook中
//    Consumer
