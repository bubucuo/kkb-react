import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({children, onFinish, onFinishFailed, form}) {
  const [formInstance] = useForm(form);

  formInstance.setCallback({
    onFinish,
    onFinishFailed
  });
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        event.stopPropagation();
        formInstance.submit();
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
