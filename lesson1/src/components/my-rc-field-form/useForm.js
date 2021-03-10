import {useRef} from "react";

class FormStore {
  constructor() {
    this.store = {}; // 状态库
    // 组件实例
    this.fieldEntities = [];
  }

  setFieldEntities = (entity) => {
    this.fieldEntities.push(entity);
  };

  // get
  getFieldsValue = () => {
    return {...this.store};
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  // set
  setFieldsValue = (newStore) => {
    // 修改状态库
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 更新组件
    this.fieldEntities.forEach((entity) => {
      entity.onStoreChange();
    });
    console.log("this.store", this.store); //sy-log
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setFieldEntities: this.setFieldEntities,
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
