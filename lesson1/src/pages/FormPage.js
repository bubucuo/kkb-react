import React, {Component, useEffect} from "react";
import {Form, Input, Button} from "antd";

const FormItem = Form.Item;

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

export default class FormPage extends Component {
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

  render() {
    console.log("FormPage render", this.formRef.current); //sy-log
    return (
      <div>
        <h3>FormPage</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
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

// export default function FormPage(props) {
//   const onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };
//   const onReset = () => {
//     form.resetFields();
//   };
//   const [form] = Form.useForm();
//   useEffect(() => {
//     form.setFieldsValue({name: "default"});
//   }, []);

//   return (
//     <Form form={form} onFinish={onFinish} onReset={onReset}>
//       <FormItem label="姓名" name="name" rules={[nameRules]}>
//         <Input placeholder="name input placeholder" />
//       </FormItem>
//       <FormItem label="密码" name="password" rules={[passworRules]}>
//         <Input placeholder="password input placeholder" />
//       </FormItem>
//       <FormItem>
//         <Button type="primary" size="large" htmlType="submit">
//           Submit
//         </Button>
//       </FormItem>
//       <FormItem>
//         <Button type="default" size="large" htmlType="reset">
//           Reset
//         </Button>
//       </FormItem>
//     </Form>
//   );
// }
