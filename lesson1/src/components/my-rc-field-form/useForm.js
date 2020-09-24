import React, {useRef} from "react";

// 这个FormStore可以存储数据
class FormStore {
  constructor() {
    this.store = {}; //这是个数据仓库，可以存储我们的数据
    this.fieldEntities = []; //这个地方参照源码用的是数组，是因为要进行校验，必须要遍历所有的
    this.callbacks = {};
  }
  // 注册Field实例
  registerField = entity => {
    this.fieldEntities.push(entity);
    // 执行清理操作
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  setCallback = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    };
  };

  // 修改数据
  setFieldsValue = newStore => {
    // step1: 修改store的数据
    this.store = {
      ...this.store,
      ...newStore
    };
    // step2: 让组件更新
    // 执行Field的forceUpdate

    this.fieldEntities.forEach(entity => {
      const {name} = entity.props;
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange();
        }
      });
    });
  };

  // 获取数据
  getFieldValue = name => {
    return this.store[name];
  };

  getFiledsValue = () => {
    return {...this.store};
  };

  // 校验
  validate = () => {
    let err = [];
    // todo
    this.fieldEntities.forEach(entity => {
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

  // 提交数据
  // 判断校验结果，校验通过，执行onFinish，失败执行onFinishFailed
  submit = () => {
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

  // 这个地方做个方法传出，如果整个传出实例，实例可能会被污染、不安全
  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      registerField: this.registerField,
      setCallback: this.setCallback,
      submit: this.submit
    };
  };
}

export default function useForm(form) {
  // 这里用useRef可以帮助我们做缓存，方便复用,useRef是个hook方法
  const fromRef = useRef();
  if (!fromRef.current) {
    if (form) {
      fromRef.current = form;
    } else {
      const formStore = new FormStore();
      fromRef.current = formStore.getForm();
    }
  }
  return [fromRef.current];
}
