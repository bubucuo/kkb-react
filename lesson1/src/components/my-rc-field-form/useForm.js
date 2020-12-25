import React from "react";

class FormStore {
  constructor() {
    this.store = {}; //存储state数据, 以key value形式存储
    this.fieldEntities = []; //  存储field实例
    this.callbacks = {}; // 存储回调
  }

  setCallbacks = newCallbacks => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks
    };
  };

  // * 注册和取消注册 订阅和取消订阅 一定要成对出现
  registerFieldEntity = entity => {
    //注册
    this.fieldEntities.push(entity);
    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  getFieldValue = name => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return {...this.store};
  };

  // set函数，newStore可以定义多个state
  setFieldsValue = newStore => {
    // 合并
    // step1: 数据更新
    this.store = {
      ...this.store,
      ...newStore
    };
    // step2: 组件也要更新
    // 对应组件才需要更新，需要加筛选
    this.fieldEntities.forEach(entity => {
      Object.keys(newStore).forEach(k => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validte = callback => {
    let err = [];
    // todo 校验 作业

    return err;
  };

  submit = () => {
    const {onFinish, onFinishFailed} = this.callbacks;
    const err = this.validte();
    // 先校验this.store
    // 校验通过 执行onFinish
    // 校验失败 执行 onFinishFailed

    if (err.length === 0) {
      // 成功
      onFinish(this.getFieldsValue());
    } else {
      // 失败
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntity: this.registerFieldEntity,
      setCallbacks: this.setCallbacks,
      submit: this.submit
    };
  };
}

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
