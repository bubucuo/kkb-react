import React from "react";

// 存储Form的数据
class FormStore {
  constructor() {
    // 这里存储Form要处理的数据
    this.store = {};
    // 源码当中用的是数组
    this.fieldEntities = {}; //[];
    this.callbacks = {};
  }

  setCallback = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    };
  };

  registerEntity = entity => {
    // console.log("entity", entity.props); //sy-log
    // this.fieldEntities.push(entity);

    this.fieldEntities = {
      ...this.fieldEntities,
      [entity.props.name]: entity
    };

    // 取消卸载组件的注册
    return () => {
      delete this.fieldEntities[entity.props.name];
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

  validate = () => {
    let err = [];

    // todo 遍历this.store
    Object.keys(this.fieldEntities).forEach(key => {
      const entity = this.fieldEntities[key];
      const {rules} = entity.props;
      const rule = rules && rules[0];
      const value = this.getFieldValue(key);

      if (rule && rule.required && value === undefined) {
        err.push({
          [key]: rule.message,
          value
        });
      }
    });

    return err;
  };

  submit = () => {
    const {onFinish, onFinishFailed} = this.callbacks;
    let err = this.validate();
    if (err.length === 0) {
      onFinish && onFinish({...this.store});
    } else {
      onFinishFailed && onFinishFailed(err, {...this.store});
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      registerEntity: this.registerEntity,
      submit: this.submit,
      setCallback: this.setCallback
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
