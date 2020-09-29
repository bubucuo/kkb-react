import React, {Component} from "react";
import {createBrowserHistory} from "history";
import Router from "./Router";

export default class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }
  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}

// ? 怎么选择函数组件还是类组件
// 选择函数组件就是我想用hook方法，这个hook好处想一下，比如说复用状态逻辑（自定义hook，如useForm）、颗粒度（useEffect、useState、useReducer）更小，还有其他hook选择，如useContext。
// 没有上面的条件的话，可以选择类组件，state对象不好拆、有点大。
// ! 理论上： 函数组件和类组件可以互相替换
