import React from "react";

class FormStore {
  constructor() {
    this.store = {}; //存储state数据, 以key value形式存储
  }

  getFieldValue = name => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return {...this.store};
  };

  // set函数，newStore可以定义多个state
  setFieldsValue = newStore => {
    // 合并
    this.store = {
      ...this.store,
      ...newStore
    };
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue
    };
  };
}

export default function useForm() {
  const formRef = React.useRef();
  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}
