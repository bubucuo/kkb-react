import React from "react";

const warnFunc = () => {
  console.log("----------err--------"); //sy-log
};

const FieldContext = React.createContext({
  registerField: warnFunc,
  setFieldsValue: warnFunc,
  getFieldValue: warnFunc,
  getFieldsValue: warnFunc,
  submit: warnFunc
});

export default FieldContext;
