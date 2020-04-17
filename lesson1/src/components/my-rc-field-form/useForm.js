import React from "react";

class FormStore {
  constructor() {
    this.store = {}; //存储数据，比如说username password
    this.fieldEntities = [];
    // callback onFinish onFinishFailed
    this.callbacks = {};
  }

  // 注册
  registerField = entity => {
    this.fieldEntities.push(entity);
  };

  setCallback = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    };
  };

  // 取数据
  getFiledValue = name => {
    return this.store[name];
  };
  getFiledsValue = () => {
    return this.store;
  };

  // 设置数据
  setFiledsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };
    console.log("this.store", this.store); //sy-log

    this.fieldEntities.forEach(entity => {
      const {name} = entity.props;
      // todo 需要更改
      if (this.getFiledValue(name) !== undefined) {
        entity.onStoreChange();
      }
    });
  };

  validate = () => {
    let err = [];
    // todo
    this.fieldEntities.forEach(entity => {
      const {name, rules} = entity.props;
      let value = this.getFiledValue(name);
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
    // 在这里校验 成功的话 执行onFinish ，失败执行onFinishFailed
    const {onFinish, onFinishFailed} = this.callbacks;
    if (err.length === 0) {
      // 成功的话 执行onFinish
      onFinish(this.getFiledsValue());
    } else if (err.length > 0) {
      // ，失败执行onFinishFailed
      onFinishFailed(err);
    }
  };

  getForm = () => {
    return {
      registerField: this.registerField,
      setCallback: this.setCallback,
      submit: this.submit,
      getFiledValue: this.getFiledValue,
      getFiledsValue: this.getFiledsValue,
      setFiledsValue: this.setFiledsValue
    };
  };
}

export default function useForm(form) {
  let res;
  if (form) {
    res = form;
  } else {
    // new 一个
    const formStore = new FormStore();
    res = formStore.getForm();
  }
  return [res];
}
