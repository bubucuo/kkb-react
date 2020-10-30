import React from "react";

// 存储Form的数据
class FormStore {
  constructor() {
    // 这里存储Form要处理的数据
    this.store = {};
    // 源码当中用的是数组
    this.fieldEntities = {}; //[];
  }

  registerEntity = entity => {
    // console.log("entity", entity.props); //sy-log
    // this.fieldEntities.push(entity);

    this.fieldEntities = {
      ...this.fieldEntities,
      [entity.props.name]: entity
    };
  };

  getFieldValue = name => {
    const v = this.store[name];
    return v;
  };

  // {name: 'omg', password: 123}
  setFieldValue = newStore => {
    // step1： 修改store数据
    this.store = {
      ...this.store,
      ...newStore
    };

    // step2： 更新组件
    Object.keys(newStore).forEach(name => {
      this.fieldEntities[name].onStoreChange();
    });
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      registerEntity: this.registerEntity
    };
  };
}

// 自定义hook
export default function useForm() {
  const formRef = React.useRef();

  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}
