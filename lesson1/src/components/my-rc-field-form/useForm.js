import React from "react";

class FormStore {
  constructor() {
    this.store = {}; // 存储数据，比如username、password
    this.fieldEntities = [];
    this.callbacks = {};
  }

  setCallback = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    };
  };

  registerField = entity => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);

      delete this.store[entity.props.name];
    };
  };

  getFieldValue = name => {
    return this.store[name];
  };
  getFieldsValue = name => {
    return this.store;
  };

  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };

    // 组件没有再次渲染
    this.fieldEntities.forEach(entity => {
      const {name} = entity.props;
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange();
        }
      });
    });
  };

  submit = () => {
    let err = this.validate();
    const {onFinish, onFinishFailed} = this.callbacks;
    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err);
    }
  };

  validate = () => {
    let err = [];
    this.fieldEntities.forEach(entity => {
      const {name, rules} = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        err.push({
          [name]: rule.message,
          value
        });
      }
    });
    return err;
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
  const formRef = React.useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // new
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
