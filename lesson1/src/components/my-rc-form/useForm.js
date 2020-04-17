import React, {useState, useEffect, useRef} from "react";

class FormStore {
  constructor(forceUpdate) {
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }

  getForm() {
    return {
      registerField: this.registerField,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,

      // 回调
      setCallbacks: this.setCallbacks,

      // 校验
      validateFields: this.validateFields,

      //提交
      submit: this.submit
    };
  }

  // 注册
  registerField = entity => {
    this.fieldEntities.push(entity);
  };

  getFieldValue = name => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return this.store;
  };

  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };
    // 更新对应的field entity
    for (let i = 0; i < this.fieldEntities.length; i++) {
      let entity = this.fieldEntities[i];
      let newStoreKeys = Object.keys(newStore);
      Object.keys(newStore).forEach(key => {
        if (entity.props.name === key) {
          entity.onStoreChange();
        }
      });
    }
  };

  setCallbacks = callbacks => {
    this.callbacks = {...this.callbacks, ...callbacks};
  };

  getCallbacks = () => {
    return this.callbacks;
  };

  // 校验
  validateFields = () => {
    let err = [];
    this.fieldEntities.forEach(entity => {
      const {name, rules} = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];

      if (rule && rule.required && (value === undefined || value === "")) {
        err.push({
          [name]: rule.message,
          value: value
        });
      }
    });
    return err;
  };

  submit = () => {
    const {onFinish, onFinishFailed} = this.callbacks;
    const err = this.validateFields();
    if (err.length === 0) {
      if (onFinish) {
        onFinish(this.getFieldsValue());
      }
    } else if (err.length > 0) {
      if (onFinishFailed) {
        onFinishFailed(err);
      }
    } else {
      console.log("未定义onFinish或者onFinishFailed");
    }
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
