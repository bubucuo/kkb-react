import React from "react";

const FieldContext = React.createContext();

export default FieldContext;

// ! 使用contextTypes三步走
// 1. 创建context对象 createContext
// 2. 使用Provider传递value
// 3. Provider子组件接收value
// 1）contextType 只能用在类组件中，且只能订阅单一context来源
// 2) useContext 只能用在函数组件和自定义hook中
// 3) Consumer 无限制，注意api接收格式即可
