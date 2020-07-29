import React, {useRef} from "react";

class FormStore {
  constructor() {
    this.store = {}; // 存储数据，比如说username password
    this.fieldEnetities = [];
    this.callbacks = {};
  }

  registerEntity = entity => {
    this.fieldEnetities.push(entity);
    return () => {
      this.fieldEnetities = this.fieldEnetities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  setCallback = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    };
  };

  setFieldValue = () => {};

  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };
    console.log("setFieldsValue", this.store, this.fieldEnetities); //sy-log
    // 对应的组件要进行更新
    this.fieldEnetities.forEach(entity => {
      const {name} = entity.props;
      console.log("omg", name); //sy-log

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
    this.fieldEnetities.forEach(entity => {
      const {name, rules} = entity.props;
      let value = this.getFieldValue(name);
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
    console.log("this.", this.fieldEnetities); //sy-log
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

  // 取数据
  getFieldValue = name => {
    return this.store[name];
  };
  getFiledsValue = () => {
    return this.store;
  };
  getForm() {
    return {
      registerEntity: this.registerEntity,
      setFieldValue: this.setFieldValue,
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      submit: this.submit,
      setCallback: this.setCallback
    };
  }
}

// 自定义hook
export default function useForm(form) {
  const formRef = useRef();
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
