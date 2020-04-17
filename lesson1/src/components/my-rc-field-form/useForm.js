import React, {useRef} from "react";

//存储所有的数据 ， 包括store
class FormStore {
  constructor() {
    // 存储键值对，如username、password
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }

  registerField = entity => {
    this.fieldEntities.push(entity);
  };

  setCallbacks = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    };
  };

  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };
    // 更新对应的Field;
    this.fieldEntities.forEach(entity => {
      const entityName = entity.props.name;
      if (this.getFieldValue(entityName) !== undefined) {
        entity.onStoreChange();
      }
    });
  };

  getFieldValue = name => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return this.store;
  };

  validateFields = () => {
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

  submit = () => {
    // 看校验结果，成功的话执行onFinish，失败执行ononFinishFailed
    const err = this.validateFields();
    if (err.length === 0) {
      // 成功 执行onFinish
      const {onFinish} = this.callbacks;
      if (onFinish) {
        onFinish(this.getFieldsValue());
      }
    } else if (err.length > 0) {
      // 失败 执行onFinishFailed
      const {onFinishFailed} = this.callbacks;
      if (onFinishFailed) {
        onFinishFailed(err);
      }
    }
  };

  getForm() {
    return {
      registerField: this.registerField,
      setCallbacks: this.setCallbacks,
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      submit: this.submit
    };
  }
}

export default function useForm(form) {
  let res;
  if (form) {
    res = form;
  } else {
    // new
    const formStore = new FormStore();
    res = formStore.getForm();
  }
  return [res];
}
