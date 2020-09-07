import React, { Component } from "react";
import { connect } from "dva";

// 访问store  state的user

@connect(({ user }) => ({
  user
}))
class UserPage extends Component {
  render() {
    console.log("user--", this.props); //sy-log
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;

// dva组件页面创建流程
// 1、创建一个组件页面
// 2、配置路线
// 3、如果想要配置数据层，可以先创建一个model
// 4、如果组件想要和数据层建立连接，可以通过connect
