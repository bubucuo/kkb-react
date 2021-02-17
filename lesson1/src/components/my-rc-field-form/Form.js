import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({children, onFinish, onFinishFailed, form}, ref) {
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallback({
    onFinish,
    onFinishFailed
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        formInstance.submit();
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}

// 数据收集
// Context数据跨层级传递
