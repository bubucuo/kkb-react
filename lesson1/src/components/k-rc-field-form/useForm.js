import React from "react";
// 状态管理库
class FormStore {
  constructor() {
    this.store = {}; // 数据仓库
    this.fieldEntities = []; //存储field组件
    this.callbacks = {};
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  // 注册Field组件
  // 注册 注销 必须成对出现
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity);
    // 注销
    return () => {
      this.fieldEntities = this.fieldEntities.filter((en) => en !== entity);
      delete this.store[entity.props.name];
    };
  };

  // get
  getFieldsValue = () => {
    return {...this.store};
  };
  getFieldValue = (name) => {
    return this.store[name];
  };

  // set
  // {
  //   username: 'omg',
  // password: '123'
  // }
  // 修改field
  setFieldsValue = (newStore) => {
    // 1. 修改store数据库
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 2. 组件也要更新
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };
  validate = () => {
    let err = [];
    // todo 校验
    return err;
  };

  submit = () => {
    let err = this.validate();
    const {onFinish, onFinishFailed} = this.callbacks;
    // 1. 校验
    // 2. 校验通过，执行onFinish，失败则执行onFinishFailed
    if (err.length === 0) {
      // 校验通过 onFinish
      onFinish(this.getFieldsValue());
    } else {
      // 失败则执行onFinishFailed
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
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
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
