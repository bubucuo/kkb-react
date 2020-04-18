import React, {Component} from "react";
// import {createForm} from "rc-form";
import createForm from "../components/my-rc-form/";

import Input from "../components/Input";

// antd4 form 基于rc-field-form
// antd3 form 基于rc-form （hoc）

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

@createForm
class MyRCForm extends Component {
  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({username: "default"});
  }
  submit = () => {
    const {getFieldsValue, getFieldValue, validateFields} = this.props.form;
    validateFields((err, val) => {
      if (err) {
        console.log("失败", err); //sy-log
      } else {
        console.log("成功", val); //sy-log
      }
    });
  };
  render() {
    console.log("this.props", this.props); //sy-log

    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <h3>MyRCForm</h3>
        {getFieldDecorator("username", {rules: [nameRules]})(
          <Input placeholder="Username" />
        )}
        {getFieldDecorator("password", {rules: [nameRules]})(
          <Input placeholder="Password" />
        )}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MyRCForm;
