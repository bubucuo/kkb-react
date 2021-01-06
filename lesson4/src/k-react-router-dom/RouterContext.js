import React from "react";

const RouterContext = React.createContext();

export default RouterContext;

// step1 创建contetx对象
// step2 使用Provider 传递value
// step3 子组件消费最近的Provider的value： useContext  Consumer contextType
