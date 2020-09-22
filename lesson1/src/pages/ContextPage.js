import React, {Component} from "react";
import {ThemeProvider, UserProvider} from "../Context";
import ContextTypePage from "./ContextTypePage";
import UseContextPage from "./UseContextPage";
import ConsumerPage from "./ConsumerPage";

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
        <h3 className={theme.themeColor}>ContextPage</h3>
        <button onClick={this.changeColor}>change color</button>
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

// ! 使用contetx的步骤

// step1: 创建一个context对象
// step2: 使用这个context对象的Provder传递
// step3: 这个Provider的子组件接收value： contextType、useContext、Consumer
// useContext只能用在函数组件或者自定hook
// contextType只能用在类组件，只能订阅单一的context来源
// Consumer 没有明显的限制，就是写起来有点麻烦而已~
