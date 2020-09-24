import React from "react";
import _Form from "./Form";
import Field from "./Field";
import useForm from "./useForm";

const Form = React.forwardRef(_Form);
Form.useForm = useForm;
export {Field, useForm};
export default Form;

// todo lesson2完成上节课遗留下的问题
//  完善useForm
// Field组件卸载了之后，对应数据也要做清除
// 完善类组件实现，加上ref（学习两个api ：forwardRef和useImperativeHandle）
