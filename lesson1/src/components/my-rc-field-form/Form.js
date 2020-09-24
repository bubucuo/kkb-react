import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

export default function Form({form, children, onFinish, onFinishFailed}, ref) {
  const [formInstance] = useForm(form);
  console.log("formInstance", formInstance); //sy-log

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
