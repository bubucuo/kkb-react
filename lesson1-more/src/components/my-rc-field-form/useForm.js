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
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    };
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
  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };

    this.fieldEntities.forEach(entity => {
      const {name} = entity.props;

      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange();
        }
      });
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
    console.log("this.", this.fieldEntities); //sy-log
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
      setFieldsValue: this.setFieldsValue
    };
  };
}

// 自定义hook
export default function useForm(form) {
  const formRef = React.useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // new 一个
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
