import React, {useState, useEffect} from "react";
import FieldContext, {HOOK_MARK} from "./FieldContext";
import useForm from "./useForm";

export default function Form(props, ref) {
  const {form, children, onValuesChange, onFinish, onFinishFailed} = props;
  const [formInstance] = useForm(form);
  const {setCallbacks} = formInstance.getInternalHooks(HOOK_MARK);
  setCallbacks({
    onValuesChange,
    onFinish: values => {
      onFinish && onFinish(values);
    },
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
