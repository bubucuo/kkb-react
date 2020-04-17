import React, {useState, useEffect} from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({form, onFinish, onFinishFailed, children}, ref) {
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
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
