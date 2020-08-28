import React from "react";
import _Form from "./Form";
import useForm from "./useForm";
import Field from "./Field";

// forwardRef转发ref
const Form = React.forwardRef(_Form);

Form.useForm = useForm;
Form.Field = Field;

export {Field, useForm};
export default Form;

// form都是要搜集数据，做校验，最后提交
// antd3 form 基于rc-form（hoc），存在form层的state，缺点是就是更新一个值（如input），执行setState，整个form表单重新渲染
// antd4 form 基于rc-field-form（context、hook），数据存在store，

//
