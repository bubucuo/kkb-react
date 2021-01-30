import React, {useContext} from "react";

// React跨层级数据传递 context
// 1. 创建context对象
const Context = React.createContext();

// 2. Provider 传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}> {children} </Context.Provider>;
}

// 3. 子组件小消费context value
// 消费方式有三种： contextType(只能用在类组件，只能订阅单一的context来源)
//useContext（只能用在函数组件以及自定义hook中）
// Consumer
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  const store = useContext(Context);

  const {getState, dispatch} = store;

  const stateProps = mapStateToProps(getState());
  const dispatchProps = {dispatch};

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

function bindActionCreator(creator, dispatch) {
  // 修改redux状态管理库的状态，dispatch（action）
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}
