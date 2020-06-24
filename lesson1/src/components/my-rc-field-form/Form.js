import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({form, children, onFinish, onFinishFailed}) {
  const [formInstance] = useForm(form);
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
