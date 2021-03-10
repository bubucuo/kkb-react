import {useRef} from "react";

class FormStore {
  constructor() {
    this.store = {}; // 状态库
    // 组件实例
    this.fieldEntities = [];

    // 记录回调
    this.callbacks = {};
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  // 有注册，得有取消注册，
  // 订阅和取消订阅也是要成对出现的
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (_entity) => _entity != entity
      );
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
  setFieldsValue = (newStore) => {
    // name: value
    // 1. 修改状态库
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 2. 更新组件
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
    const {onFinish, onFinishFailed} = this.callbacks;
    let err = this.validate();

    if (err.length > 0) {
      // 失败 onFinishFailed
      onFinishFailed(this.getFieldsValue(), err);
    } else {
      // 成功 onFinish()
      onFinish(this.getFieldsValue());
    }
    console.log("omg"); //sy-log
    // 校验成功 执行onFinish
    // 校验失败 执行onFinishFailed
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
