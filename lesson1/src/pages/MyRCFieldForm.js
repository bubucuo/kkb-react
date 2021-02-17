import React, {Component, useEffect} from "react";
// import Form, {Field} from "rc-field-form";
import Form, {Field} from "../components/my-rc-field-form/";
import Input from "../components/Input";

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

// export default function MyRCFieldForm(props) {
//   const [form] = Form.useForm();

//   const onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };

//   // 表单校验失败执行
//   const onFinishFailed = val => {
//     console.log("onFinishFailed", val); //sy-log
//   };

//   // 函数组件初次渲染之后执行，类似componentDidMount
//   useEffect(() => {
//     console.log("form", form); //sy-log
//     form.setFieldValue({username: "default"});
//   }, []);

//   return (
//     <div>
//       <h3>MyRCFieldForm</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <Field name="username" rules={[nameRules]}>
//           <Input placeholder="input UR Username" />
//         </Field>
//         <Field name="password" rules={[passworRules]}>
//           <Input placeholder="input UR Password" />
//         </Field>
//         <button>Submit</button>
//       </Form>
//     </div>
//   );
// }

// * Form 收集数据
// * 数据存在哪儿？  Form State(antd3) 或者  class FormStore（antd4）

export default class MyRCFieldForm extends Component {
  formRef = React.createRef();
  componentDidMount() {
    this.formRef.current.setFieldValue({username: "default"});
  }

  onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };
  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </Field>
          <Field name="password" rules={[passworRules]}>
            <Input placeholder="Password" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}
