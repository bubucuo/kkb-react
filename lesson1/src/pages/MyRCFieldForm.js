import React, {Component, useEffect} from "react";
// import Form, {Field} from "rc-field-form";
import Form, {Field} from "../components/my-rc-field-form/";
import Input from "../components/Input";

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

// * antd4 form实现原理
// 创建数据仓库(银行) 统一管理state数据，提供get set函数（能查询余额、存钱取钱），
// 某个组件的state需要改变，则只更新对应组件，而不是更新这个Form

export default function MyRCFieldForm(props) {
  const [form] = Form.useForm();

  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };

  // didmount
  useEffect(() => {
    console.log("form", form); //sy-log
    // form.setFieldsValue({username: "default"});
  }, []);

  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input UR Username" />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input placeholder="input UR Password" />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}

// export default class MyRCFieldForm extends Component {
//   formRef = React.createRef();
//   componentDidMount() {
//     console.log("form", this.formRef.current); //sy-log
//     this.formRef.current.setFieldsValue({username: "default"});
//   }

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
//         <h3>MyRCFieldForm</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}>
//           <Field name="username" rules={[nameRules]}>
//             <Input placeholder="Username" />
//           </Field>
//           <Field name="password" rules={[passworRules]}>
//             <Input placeholder="Password" />
//           </Field>
//           <button>Submit</button>
//         </Form>
//       </div>
//     );
//   }
// }
