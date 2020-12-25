import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

// 这里等下我想用hook
export default function Form({children, onFinish, onFinishFailed, form}, ref) {
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({onFinish, onFinishFailed});

  return (
    <FieldContext.Provider value={formInstance}>
      <form
        onSubmit={e => {
          // 提交
          e.preventDefault();
          formInstance.submit();
        }}>
        {children}
      </form>
    </FieldContext.Provider>
  );
}
