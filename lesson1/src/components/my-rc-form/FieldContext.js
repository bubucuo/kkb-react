import React from "react";

const warningFunc = () => {
  console.warn("warning");
};

const FieldContext = React.createContext({
  submit: warningFunc,
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  setFieldsValue: warningFunc,
  validateFields: warningFunc,
  registerField: warningFunc
});

export default FieldContext;
