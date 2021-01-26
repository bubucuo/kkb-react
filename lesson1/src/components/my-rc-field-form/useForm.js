import React, {Component} from "react";

class FormStore {
  constructor(props) {
    this.store = {}; //数据仓库
    this.fieldEntities = []; // 存储组件实例
    this.callbacks = {};
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };
  //
  setFieldEntities = (field) => {
    this.fieldEntities.push(field);
    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter((f) => f !== field);
      delete this.store[field.props.name];
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
  setFieldsValue = (newStore) => {
    // 'name': 'value'
    // 更新数据仓库
    this.store = {
      ...this.store,
      ...newStore,
    };

    //更新组件
    // forceUpdate
    this.fieldEntities.forEach((field) => {
      Object.keys(newStore).forEach((k) => {
        if (k === field.props.name) {
          field.onStoreChange();
        }
      });
    });

    console.log("ts", this.store); //sy-log
  };

  validate = () => {
    let err = [];

    // todo 实现基础校验，比如只要输入了信息就通过

    return err;
  };

  submit = () => {
    const err = this.validate();
    const {onFinish, onFinishFailed} = this.callbacks;
    console.log("submit"); //sy-log
    // 校验成功onFinish
    // 校验失败onFinishFailed

    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      setFieldEntities: this.setFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
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
