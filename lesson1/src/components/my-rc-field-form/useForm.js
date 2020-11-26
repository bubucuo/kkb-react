import React from "react";

class FormStore {
  constructor() {
    this.store = {}; //仓库， 存储数据
  }

  // 修改仓库数据
  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };

    // step2: 更新组件

    console.log("hahha", this.store);
  };

  // 获取所有的数据
  getFieldsValue = () => {
    return {...this.store};
  };

  // 获取单个数据
  getFieldValue = name => {
    return this.store[name];
  };

  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue
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
