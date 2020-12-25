import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

// 这里等下我想用hook
export default function Form({children}) {
  const [formInstance] = useForm();

  return (
    <FieldContext.Provider value={formInstance}>
      {children}
    </FieldContext.Provider>
  );
}
