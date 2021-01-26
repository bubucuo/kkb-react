import useForm from "./useForm";
import React from "react";
import FieldContext from "./FieldContext";

export default function Form({children}) {
  const [form] = useForm();

  return <FieldContext.Provider value={form}>{children}</FieldContext.Provider>;
}
