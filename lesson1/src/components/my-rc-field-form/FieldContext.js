import React from "react";

const warnFunc = () => {
  console.log("------warn-----"); //sy-log
};

const FieldContext = React.createContext({
  submit: warnFunc,
  getFiledValue: warnFunc,
  getFiledsValue: warnFunc,
  setFiledsValue: warnFunc
});

export default FieldContext;
