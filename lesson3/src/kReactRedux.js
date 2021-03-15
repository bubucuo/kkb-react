import React, {useContext, useEffect, useReducer, useState} from "react";

// 数据跨层级传递 三步走
// 1. 生成context对象
const Context = React.createContext();

// 2. Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// 3. 子组件消费context value
// contextType  只能用在类组件中，并且只能订阅单一的context来源
// consumer 注意使用格式 (ctx)=>{return xxx}
// useContext  只能用在函数组件和自定义hook中
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  // 取到store
  const store = useContext(Context);

  const stateProps = mapStateToProps(store.getState()); // store.getState
  const dispatchProps = {dispatch: store.dispatch}; // store.dispatch

  // 组件更新
  // 订阅dispatch后要执行事件 forceUpdate
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [, forceUpdate] = useState({});
  useEffect(() => {
    store.subscribe(() => {
      // forceUpdate
      forceUpdate();
    });
  });

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
  const obj = {};

  // todo 遍历creators， 生成新的obj
  //add: () => ({type: "ADD"}) => ()=>dispatch({type: "ADD"})

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}
