import React, {useRef} from "react";
class FormStore {
  constructor(props) {
    this.store = {};
    this.fieldEntities = [];
    this.calllbacks = {};
  }

  setCallback = callback => {
    this.calllbacks = {
      ...this.calllbacks,
      ...callback
    };
  };
  registerField = field => {
    this.fieldEntities.push(field);
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item != field);
      delete this.store[field.props.name];
    };
  };

  getFieldValue = name => {
    return this.store[name];
  };

  getFieldsValue = name => {
    return this.store;
  };

  // 修改store
  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };
    // store已经更新，但是我们希望组件也跟着更新
    this.fieldEntities.forEach(enetity => {
      const {name} = enetity.props;
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          enetity.onStoreChange();
        }
      });
    });
    console.log("store", this.store); //sy-log
  };

  validate = () => {
    let err = [];
    // todo
    this.fieldEntities.forEach(entity => {
      const {name, rules} = entity.props;
      let value = this.store[name];
      let rule = rules && rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        //  出错
        err.push({
          [name]: rules.message,
          value
        });
      }
    });
    return err;
  };

  submit = () => {
    let err = this.validate();
    if (err.length === 0) {
      this.calllbacks.onFinish(this.store);
    } else if (err.length > 0) {
      this.calllbacks.onFinishFailed(err);
    }
    // 成功
    // 失败
  };
  getForm = () => {
    return {
      setCallback: this.setCallback,
      submit: this.submit,
      registerField: this.registerField,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue
    };
  };
}

export default function useForm(form) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
