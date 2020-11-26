import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

export default function Form({children, form, onFinish, onFinishFailed}, ref) {
  const [formInstance] = useForm(form);

  formInstance.setCallback({onFinish, onFinishFailed});

  React.useImperativeHandle(ref, () => formInstance);

  return (
    <form
      onClick={e => {
        e.preventDefault();
        formInstance.submit();
        console.log("submit");
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
