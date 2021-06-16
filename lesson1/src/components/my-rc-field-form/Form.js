import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({form, onFinish, onFinishFailed, children}, ref) {
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  console.log("formInstance", formInstance); //sy-log
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
