import React from "react";

const FieldContext = React.createContext();

export default FieldContext;

// * React使用context三步走
// step1: 创建context对象
// step2: 使用Provider传递value
// step3: 子组件消费context value：
// useContext hook函数只能用在函数组件或者自定义hook中
// contextType 只能用在类组件中，并且只能订阅单一的context来源
// Consumer
