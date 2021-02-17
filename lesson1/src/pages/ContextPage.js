import React, {Component} from "react";
import {ThemeProvider, UserProvider} from "../Context";
import ContextTypePage from "./ContextTypePage";
import UseContextPage from "./UseContextPage";
import {Button} from "antd";
import ConsumerPage from "./ConsumerPage";

// var themeColor = "red";
export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {
        name: "小明"
      }
    };
  }

  changeColor = () => {
    const {themeColor} = this.state.theme;
    this.setState({
      theme: {themeColor: themeColor === "red" ? "green" : "red"}
    });
  };

  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <Button type="primary" onClick={this.changeColor}>
          change color
        </Button>
        <ThemeProvider value={theme}>
          <UserProvider value={user}>
            <ContextTypePage />
            <UseContextPage />
            <ConsumerPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    );
  }
}

// ? 怎么使用context
// step1 创建一个context对象
// step2 最外层提供要跨层级传递的数据 Provider （生产者）
// setp3 哪些组件可以使用context value ，Consumer （消费者）
// 1） ContextType 只能用在类组件当中 , 只能订阅单一的context来源
// 2） useContext 只能用在函数组件和自定义hook中
// 3) Consumer 可以用在函数组件和类组件中，也能订阅多个context来源
// ?

// todo context现在不常见，不建议使用 ？何伟城
// 因为context消耗性能很大,所以要慎用！

// todo context与redux
// contetx是子孙组件与祖先组件跨层级传递数据
// redux更多是数据共享，组件之间没有明显的层级关系，可能是并列的。
