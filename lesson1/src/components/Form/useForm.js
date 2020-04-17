import React, {useState, useRef} from "react";
import {HOOK_MARK} from "./FieldContext";

export class FormStore {
  constructor(forceRootUpdate: () => {}) {
    this.formHooked = false;
    this.store = {};
    this.initialValues = {};
    this.callbacks = () => {};
    this.forceRootUpdate = forceRootUpdate;
    this.fieldEntities = [];
  }
  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      resetFields: this.resetFields,
      setFieldsValue: this.setFieldsValue,
      submit: this.submit,

      getInternalHooks: this.getInternalHooks
    };
  };

  resetFields = () => {
    // this.store  = {}
    // this.notifyObservers(prevStore, namePathList, { type: 'reset' });
  };

  dispatch = (action: ReducerAction) => {
    switch (action.type) {
      case "updateValue": {
        const {name, value} = action;
        this.updateValue(name, value);
        break;
      }
      case "validateField": {
        const {namePath, triggerName} = action;
        this.validateFields([namePath], {triggerName});
        break;
      }
      default:
      // Currently we don't have other action. Do nothing.
    }
  };

  getFieldEntities = (pure = false) => {
    if (!pure) {
      return this.fieldEntities;
    }

    return this.fieldEntities.filter(field => field.getNamePath().length);
  };

  getFieldsValue = () => {
    return this.store;
  };

  getFieldValue = name => {
    return this.store[name];
  };

  setCallbacks = callbacks => {
    this.callbacks = callbacks;
  };

  getInternalHooks = key => {
    if (key === HOOK_MARK) {
      this.formHooked = true;
      return {
        dispatch: this.dispatch,
        registerField: this.registerField,
        setCallbacks: this.setCallbacks
      };
    }
    return null;
  };

  // Observer
  registerField = entity => {
    this.fieldEntities.push(entity);

    // un-register field callback
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
    };
  };

  dispatch = (action, callback) => {
    switch (action.type) {
      case "updateValue": {
        const {name, value} = action;
        this.updateValue(name, value, callback);
        break;
      }
      case "validateField": {
        const {namePath, triggerName} = action;
        this.validateFields([namePath], {triggerName});
        break;
      }
      default:
      // Currently we don't have other action. Do nothing.
    }
  };

  updateValue = (name, value, callback) => {
    this.store = {...this.store, [name]: value};
    callback();
  };

  setFieldsValue = store => {
    const prevStore = {...this.store};
    if (store) {
      this.store = {...this.store, ...store};
    }
    this.notifyObservers(prevStore, null, {
      type: "valueUpdate",
      source: "external"
    });
  };

  notifyObservers = (prevStore, namePathList, info) => {
    this.getFieldEntities().forEach(({onStoreChange}) => {
      onStoreChange();
    });
  };

  //  ValidateFields

  validateFields = () => {
    // const returnPromise =
    const promiseList = [];
    this.getFieldEntities().forEach(field => {
      // if (!field.props.rules || !field.props.rules.length) {
      //   return;
      // }
      // promiseList.push(promise)
    });
  };

  // Submit
  submit = () => {
    const {onFinish, onFinishFailed} = this.callbacks;
    onFinish(this.store);
    console.log("this.store", this.store); //sy-log
  };
}
export default function useForm(form) {
  const formRef = useRef();
  const [, forceUpdate] = useState();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore(forceUpdate);
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
