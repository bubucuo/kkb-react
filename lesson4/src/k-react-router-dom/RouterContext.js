import React from "react";

// 使用Context跨层级传递数据
// step1: 先创建一个Context对象
export const RouterContext = React.createContext();

// step2: 使用Provider传递value

// step3: 子孙组件消费value: Consumer、useContext、contextType
// useContext只能用在函数组件或者自定义hook中
// contextType 只能用在类组件，并且只能订阅单一的context来源
