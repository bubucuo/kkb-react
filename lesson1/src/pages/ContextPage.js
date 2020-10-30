import React, {Component} from "react";
import {ThemeProvider} from "../Context";
import ConsumerPage from "./ConsumerPage";
import ContextTypePage from "./ContextTypePage";
import UseContextPage from "./UseContextPage";

import {Button} from "antd";

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
          <ConsumerPage />
          <ContextTypePage />
          <UseContextPage />
        </ThemeProvider>
      </div>
    );
  }
}

// ! 如何使用context
// 1. 创建一个context对象： `React.createContext`
// 2. Provider提供者 接收一个value ，value就是我们要传递的参数
// 3. 子组件如何接收呢 ： 三种办法：（ContextType（只能用在类组件当中）、COnsumer、useContext（只能用在函数组件或者自定义hook中））
