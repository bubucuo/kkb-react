import React from "react";
import FieldContext from "./FieldContext";

// 因为等会儿我要在这儿用hook方法
export default function Form({children, form, onFinish, onFinishFailed}) {
  form.setCallback({
    onFinish,
    onFinishFailed
  });
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        form.submit();
      }}>
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  );
}
