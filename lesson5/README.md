# lesson12 - 手写实现Switch

b站账号：欧米伽莎士比亚

[b站视频地址](https://www.bilibili.com/video/BV1XZ4y1V7ME/)

[TOC]

## 资源

1. [React 官网](https://react.docschina.org/)
2. [react-router](http://react-router.docschina.org/)



## 课堂目标

1. react-router实现



## 知识点 

### 实现Switch

渲染与该地址匹配的第一个子节点 `<Route>` 或者 `<Redirect>`。

```jsx
import React, {Component, isValidElement} from "react";
import {RouterContext} from "./Context";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {location} = context;
          let match, element;
          // children element | array
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const {path} = child.props;
              match = path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });
          return match
            ? React.cloneElement(element, {computedMatch: match})
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
```

