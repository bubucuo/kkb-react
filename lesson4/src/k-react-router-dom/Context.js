import React from "react";

export const RouterContext = React.createContext();

// 用context的三步
// 1. 创建一个context对象
// 2. 用Context.Provider传递value
// 3. 子孙组件接收context value（contextType、useContext、Consumer）
