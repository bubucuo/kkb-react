// import React, {Component, useEffect} from "react";
// import {Form, Input, Button} from "antd";

// const FormItem = Form.Item;

// const nameRules = {required: true, message: "请输入姓名！"};
// const passworRules = {required: true, message: "请输入密码！"};

// export default function AntdFormPage(props) {
//   const [form] = Form.useForm();
//   // 表单校验成功执行
//   const onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };
//   // 表单校验失败执行
//   const onFinishFailed = val => {
//     console.log("onFinishFailed", val); //sy-log
//   };

//   useEffect(() => {
//     console.log("form", form); //sy-log
//     form.setFieldsValue({name: "default"});
//   }, []);

//   return (
//     <div>
//       <h3>AntdFormPage</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <FormItem label="姓名" name="name" rules={[nameRules]}>
//           <Input placeholder="name input placeholder" />
//         </FormItem>
//         <FormItem label="密码" name="password" rules={[passworRules]}>
//           <Input placeholder="password input placeholder" />
//         </FormItem>
//         <FormItem>
//           <Button type="primary" size="large" htmlType="submit">
//             Submit
//           </Button>
//         </FormItem>
//       </Form>
//     </div>
//   );
// }

import React, {Component, useEffect} from "react";
import {Form, Input, Button} from "antd";

const FormItem = Form.Item;

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

export default class AntdFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({name: "default"});
  }

  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFinish = val => {
    console.log("onFinish", val); //sy-log
  };
  onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };

  render() {
    console.log("AntdFormPage render", this.formRef.current); //sy-log
    return (
      <div>
        <h3>AntdFormPage</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          onReset={this.onReset}>
          <FormItem label="姓名" name="name" rules={[nameRules]}>
            <Input placeholder="name input placeholder" />
          </FormItem>
          <FormItem label="密码" name="password" rules={[passworRules]}>
            <Input placeholder="password input placeholder" />
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </FormItem>
          <FormItem>
            <Button type="default" size="large" htmlType="reset">
              Reset
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
