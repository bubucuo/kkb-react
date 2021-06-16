# 回顾预习录播

![image-20200624150720936](https://tva1.sinaimg.cn/large/007S8ZIlly1gg3e95zyq5j30b40ppq5a.jpg)

# React 组件化

[TOC]

## 课堂目标

掌握组件化开发中多种实现技术

1. 掌握 context，跨层级传递
2. 掌握高阶组件
3. 了解组件化概念，能设计并实现自己需要的组件
4. 掌握弹窗类实现，掌握传送门使用

## 资源

1. [create-react-app](https://www.html.cn/create-react-app/docs/getting-started/)

2. [HOC](https://reactjs.org/docs/higher-order-components.html)

3. [ant design](https://ant.design/docs/react/use-with-create-react-app-cn)

4. [课堂代码地址](https://github.com/bubucuo/kkb-react)

## 知识点

### 快速开始

(https://www.html.cn/create-react-app/docs/getting-started/)

```bash
npx create-react-app lesson1

cd lesson1

yarn start
```

### 组件化优点

1. 增强代码重用性，提高开发效率

2. 简化调试步骤，提升整个项目的可维护性

3. 便于协同开发

4. 注意点：降低耦合性

### 组件跨层级通信 - Context

![811568811420_.pic_hd](https://tva1.sinaimg.cn/large/006y8mN6ly1g73yujq7mhj31fs0rqn07.jpg)

在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

React 中使用 Context 实现祖代组件向后代组件跨层级传值。Vue 中的 provide & inject 来源于 Context。

#### Context API

##### `React.createContext`

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

##### `Context.Provider`

Provider 接收一个 `value` 属性，传递给消费组件，允许消费组件订阅 context 的变化。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

##### `Class.contextType`

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 [`React.createContext()`](https://react.docschina.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

> 你只通过该 API 订阅单一 context。

##### `Context.Consumer`

这里，React 组件也可以订阅到 context 变更。这能让你在[函数式组件](https://react.docschina.org/docs/components-and-props.html#function-and-class-components)中完成订阅 context。

这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 `value` 值等同于往上组件树离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

##### `useContext`

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。只能用在 function 组件中。

#### 使用 Context

创建 Context => 获取 Provider 和 Consumer => Provider 提供值 => Consumer 消费值

范例：共享主题色

```jsx
import React, {Component} from "react";
import ContextTypePage from "./ContextTypePage";
import {ThemeContext, UserContext} from "../Context";
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
        name: "xiaoming"
      }
    };
  }

  changeColor = () => {
    const {themeColor} = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red"
      }
    });
  };

  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>change color</button>
        <ThemeContext.Provider value={theme}>
          <ContextTypePage />
          <UserContext.Provider value={user}>
            <UseContextPage />
            <ConsumerPage />
          </UserContext.Provider>
        </ThemeContext.Provider>
        <ContextTypePage />
      </div>
    );
  }
}
```

//Context.js

```jsx
import React from "react";

export const ThemeContext = React.createContext({themeColor: "pink"});

export const UserContext = React.createContext();
```

##### pages/ContextTypePage.js

```jsx
import React, {Component} from "react";
import {ThemeContext} from "../Context";

export default class ContextTypePage extends Component {
  static contextType = ThemeContext;
  render() {
    const {themeColor} = this.context;
    return (
      <div className="border">
        <h3 className={themeColor}>ContextTypePage</h3>
      </div>
    );
  }
}
```

##### pages/ConsumerPage.js

```jsx
import React, {Component} from "react";
import {ThemeContext, UserContext} from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div className="border">
        <ThemeContext.Consumer>
          {themeContext => (
            <>
              <h3 className={themeContext.themeColor}>ConsumerPage</h3>
              <UserContext.Consumer>
                {userContext => <HandleUserContext {...userContext} />}
              </UserContext.Consumer>
            </>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

function HandleUserContext(userCtx) {
  return <div>{userCtx.name}</div>;
}
```

##### 消费多个 Context

```jsx
<ThemeProvider value={theme}>
  <ContextTypePage />
  <ConsumerPage />

  {/*多个Context */}
  <UserProvider value={user}>
    <MultipleContextsPage />
  </UserProvider>
</ThemeProvider>
```

如果两个或者更多的 context 值经常被一起使用，那你可能要考虑一下另外创建你自己的渲染组件，以提供这些值。

##### pages/UseContextPage

```jsx
import React, {useState, useEffect, useContext} from "react";
import {ThemeContext, UserContext} from "../Context";

export default function UseContextPage(props) {
  const themeContext = useContext(ThemeContext);
  const {themeColor} = themeContext;
  const userContext = useContext(UserContext);
  return (
    <div className="border">
      <h3 className={themeColor}>UseContextPage</h3>
      <p>{userContext.name}</p>
    </div>
  );
}
```

#### 注意事项

因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 `value` 属性总是被赋值为新的对象：

```jsx
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: "something"}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

为了防止这种情况，将 value 状态提升到父节点的 state 里：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: "something"}
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

#### 总结

在 React 的官方文档中，[`Context`](https://link.juejin.im/?target=https%3A%2F%2Freactjs.org%2Fdocs%2Fcontext.html)被归类为高级部分(Advanced)，属于 React 的高级 API，建议不要滥用。

后面我们要学习到的 react-redux 的`<Provider />`，就是通过`Context`提供一个全局态的`store`，路由组件 react-router 通过`Context`管理路由状态等等。在 React 组件开发中，如果用好`Context`，可以让你的组件变得强大，而且灵活。
