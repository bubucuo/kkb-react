import React from "react";

class FormStore {
  constructor() {
    this.store = {}; //仓库， 存储数据
    this.fieldEntities = []; //实例
    this.callbacks = {};
  }

  setCallback = newCallbacks => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks
    };
  };

  registerField = field => {
    this.fieldEntities.push(field);

    // 取消注册
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== field);
      delete this.store[field.props.name];
    };
  };

  // 修改仓库数据
  setFieldsValue = newStore => {
    // step1: 修改仓库值
    this.store = {
      ...this.store,
      ...newStore
    };

    // step2: 更新组件
    this.fieldEntities.forEach(entity => {
      const {name} = entity.props;

      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange();
        }
      });
    });
  };

  // 获取所有的数据
  getFieldsValue = () => {
    return {...this.store};
  };

  // 获取单个数据
  getFieldValue = name => {
    return this.store[name];
  };

  validate = () => {
    let err = [];

    // todo 校验
    this.fieldEntities.forEach(entity => {
      const {name, rules} = entity.props;

      let rule = rules && rules[0];
      // if(){}
    });

    // 成功 err

    // 失败err.push({err: 'err'})

    return err;
  };

  submit = () => {
    const err = this.validate();
    const {onFinish, onFinishFailed} = this.callbacks;
    if (err.length === 0) {
      onFinish(this.getFieldsValue());
      console.log("成功"); //sy-log
    } else if (err.length > 0) {
      onFinishFailed(err, this.getFieldsValue());
      console.log("失败"); //sy-log
    }
  };

  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      registerField: this.registerField,
      submit: this.submit,
      setCallback: this.setCallback
    };
  };
}

// useForm是自定义hook，useRef是个React自带的Hook API
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

// Form 表单
// * form 子组件的state存在哪儿？
// antd3 form state 是有缺点的，setSTate会导致整个组件更新，对于大表单性能不利
// antd4 利用hook，把数据仓库存到FormStore当中，只更新相关联的组件
// 数据仓库访问的话，注意get以及set
