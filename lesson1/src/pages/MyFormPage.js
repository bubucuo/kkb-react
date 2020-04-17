import React, {Component, useEffect} from "react";
// import Form from "rc-field-form";
// import Form from "../components/rc-form/index.tsx";
import Form from "../components/my-rc-form/";

const {Field, useForm} = Form;

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

// export default class MyFormPage extends Component {
//   formRef = React.createRef();

//   componentDidMount() {
//     // this.formRef.current.setFieldsValue({name: "default"});
//   }

//   onValuesChange = (changedValues, values) => {
//     console.log("onValuesChange", changedValues, values); //sy-log
//     // this.formRef.current.resetFields();
//   };
//   onFieldsChange = (changedFields, allFields) => {
//     console.log("onFieldsChange", changedFields, allFields); //sy-log
//   };
//   onFinish = val => {
//     const {getFieldValue, getFieldsValue} = this.formRef.current;

//     console.log("onFinish", getFieldValue("username")); //sy-log
//   };

//   onFinishFailed = err => {
//     console.log("onFinishFailed", err); //sy-log
//   };

//   setRef = form => {
//     this.form = form;
//     // Form instance here
//   };
//   componentDidMount() {
//     const {setFieldsValue} = this.formRef.current;
//     setFieldsValue({username: "default"});
//     console.log("asas", this.formRef.current); //sy-log
//   }
//   render() {
//     return (
//       <div>
//         <h3>FormPage</h3>
//         <Form
//           ref={this.formRef}
//           // ref={this.formRef}
//           onFinish={this.onFinish}
//           onValuesChange={this.onValuesChange}
//           // onFieldsChange={this.onFieldsChange}
//           onFinishFailed={this.onFinishFailed}>
//           <Field name="username" rules={[nameRules]}>
//             <input placeholder="Username" />
//           </Field>
//           <Field name="password" rules={[passworRules]}>
//             <input placeholder="Password" />
//           </Field>
//           <button>Submit</button>
//         </Form>
//       </div>
//     );
//   }
// }

export default function MyFormPage(props) {
  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // const onValuesChange = (changedValues, values) => {
  //   console.log("onValuesChange", changedValues, values); //sy-log
  //   // this.formRef.current.resetFields();
  // };

  const onFinishFailed = err => {
    console.log("onFinishFailed", err); //sy-log
  };

  const [form] = Form.useForm();
  useEffect(() => {
    console.log("form", form); //sy-log
    form.setFieldsValue({
      username: "default"
    });
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      // onValuesChange={onValuesChange}
      onFinishFailed={onFinishFailed}>
      <Field name="username" rules={[nameRules]}>
        <input placeholder="Username" />
      </Field>
      <Field name="password" rules={[passworRules]}>
        <input placeholder="Password" />
      </Field>
      <button>Submit</button>
    </Form>
  );
}
