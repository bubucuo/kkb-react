import React from "react";
import FieldForm from "./Form";
import Field from "./Field";
import useForm from "./useForm";

const Form = React.forwardRef(FieldForm);
Form.useForm = useForm;
Form.Field = Field;

export {useForm, Field};
export default Form;
