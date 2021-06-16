import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({form, children, onFinish, onFinishFailed}, ref) {
  const [formInstance] = useForm(form);

  // 子-》父
  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
