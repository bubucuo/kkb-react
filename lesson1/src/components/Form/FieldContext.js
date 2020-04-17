import React from "react";
export const HOOK_MARK = "RC_FORM_INTERNAL_HOOKS";

const warningFunc: any = () => {
  console.error("wraning"); //sy-error
};

const FieldContext = React.createContext({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  getFieldError: warningFunc,
  getFieldsError: warningFunc,
  isFieldsTouched: warningFunc,
  isFieldTouched: warningFunc,
  isFieldValidating: warningFunc,
  isFieldsValidating: warningFunc,
  resetFields: warningFunc,
  setFields: warningFunc,
  setFieldsValue: warningFunc,
  validateFields: warningFunc,
  submit: warningFunc,

  getInternalHooks: () => {
    warningFunc();

    return {
      dispatch: warningFunc,
      registerField: warningFunc,
      useSubscribe: warningFunc,
      setInitialValues: warningFunc,
      setCallbacks: warningFunc,
      getFields: warningFunc,
      setValidateMessages: warningFunc
    };
  }
});

export default FieldContext;
