import React from "react";

class FormStore {
  constructor(props) {
    this.store = {}; //数据仓库
    this.fieldEntities = []; // 存储组件实例
  }

  // get
  getFieldsValue = () => {
    return {...this.store};
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  // set
  setFieldsValue = (newStore) => {
    // 更新数据仓库
    this.store = {
      ...this.store,
      ...newStore,
    };

    //更新组件
    // forceUpdate
    console.log("ts", this.store); //sy-log
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
    };
  };
}

export default function useForm(props) {
  const formRef = React.useRef();

  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}
