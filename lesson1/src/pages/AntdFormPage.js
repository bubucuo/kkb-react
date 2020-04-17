import React, {Component, useRef, useEffect} from "react";
import {Form, Input, Button} from "antd";

const FormItem = Form.Item;

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

// export default class AntdFormPage extends Component {
//   constructor(props) {
//     super(props);
//     this.formRef = React.createRef();
//   }

//   componentDidMount() {
//     console.log("this.formRef.current ", this.formRef.current); //sy-log
//     // 填充默认值
//     this.formRef.current.setFieldsValue({username: "default"});
//   }
//   // 表单校验通过之后执行
//   onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };

//   // 表单校验失败执行
//   onFinishFailed = val => {
//     console.log("onFinishFailed", val); //sy-log
//   };
//   render() {
//     return (
//       <div>
//         <h3>AntdFormPage</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}>
//           <FormItem name="username" label="username" rules={[nameRules]}>
//             <Input placeholder="input placeholder" />
//           </FormItem>
//           <FormItem name="password" label="password" rules={[passworRules]}>
//             <Input placeholder="input placeholder" />
//           </FormItem>
//           <FormItem>
//             <Button type="primary" size="large" htmlType="submit">
//               Submit
//             </Button>
//           </FormItem>
//         </Form>
//       </div>
//     );
//   }
// }

export default function AntdFormPage(props) {
  const [form] = Form.useForm();

  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };

  useEffect(() => {
    form.setFieldsValue({username: "default"});
  }, []);

  return (
    <div>
      <h3>AntdFormPage</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem name="username" label="username" rules={[nameRules]}>
          <Input placeholder="input placeholder" />
        </FormItem>
        <FormItem name="password" label="password" rules={[passworRules]}>
          <Input placeholder="input placeholder" />
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
