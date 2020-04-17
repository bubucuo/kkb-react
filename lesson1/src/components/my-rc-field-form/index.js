import _Form from "./Form";
import Field from "./Field";
import useForm from "./useForm";

const Form = _Form;
Form.Field = Field;
Form.useForm = useForm;

export {Field, useForm};
export default Form;

// todo 1. 更新两次filed的问题自己解决
// todo 2. 实现class版本， 要求掌握ref以及hook
// todo 3. antd3 form原理与antd比较
