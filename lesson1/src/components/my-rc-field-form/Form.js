import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({children}) {
  const [formInstance] = useForm();

  return (
    <form>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
