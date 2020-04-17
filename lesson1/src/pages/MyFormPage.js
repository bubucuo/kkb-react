import React, {Component, useEffect} from "react";
// import Form from "rc-field-form";
// import Form from "../components/rc-form/index.tsx";
import Form from "../components/my-rc-form/";
import Input from "../components/Input";

const {Field, useForm} = Form;

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

export default class MyFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({username: "default"});
    console.log("form", this.formRef.current); //sy-log
  }

  onFinish = val => {
    const {getFieldValue, getFieldsValue} = this.formRef.current;
    console.log("onFinish", val); //sy-log
  };

  onFinishFailed = err => {
    console.log("onFinishFailed", err); //sy-log
  };

  render() {
    return (
      <div>
        <h3>FormPage</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </Field>
          <Field name="password" rules={[passworRules]}>
            <Input placeholder="Password" value="" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}

// export default function MyFormPage(props) {
//   const onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };

//   const onFinishFailed = err => {
//     console.log("onFinishFailed", err); //sy-log
//   };

//   const [form] = Form.useForm();
//   useEffect(() => {
//     console.log("form", form); //sy-log
//     form.setFieldsValue({
//       username: "default"
//     });
//   }, []);

//   return (
//     <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//       <Field name="username" rules={[nameRules]}>
//         <input placeholder="Username" />
//       </Field>
//       <Field name="password" rules={[passworRules]}>
//         <input placeholder="Password" />
//       </Field>
//       <button>Submit</button>
//     </Form>
//   );
// }
