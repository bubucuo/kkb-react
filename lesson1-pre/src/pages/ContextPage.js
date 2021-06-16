import React, {Component} from "react";
import {Button} from "antd";
import {Context, UserContext} from "../Context";
import ContextTypePage from "./ContextTypePage";
import UseContextPage from "./UseContextPage";
import ConsumerPage from "./ConsumerPage";

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {themeColor: "red"},
      user: {name: "小明"}
    };
  }

  changeColor = () => {
    const {theme} = this.state;
    const {themeColor} = theme;
    this.setState({
      theme: {themeColor: themeColor === "red" ? "green" : "red"}
    });
  };

  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>click</button>
        <Context.Provider value={theme}>
          <UserContext.Provider value={user}>
            <ContextTypePage />
            <UseContextPage />
            <ConsumerPage />
          </UserContext.Provider>
        </Context.Provider>
      </div>
    );
  }
}

// * 如何使用Context
// step1 : 创建一个context对象
// step2: 创建Provider，传递value
// step3: 子组件消费value , 有三种途径： contextType、useContext、Consumer

// * 区别
// contextType 只能用在类组件，只能订阅单一的context来源
// useContext只能用在函数组件或者自定义hook中
// Consumer 不限制函数或者类组件
