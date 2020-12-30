import React, {useContext, useEffect} from "react";

// 跨层级数据传递
// 分三步走
// * step1 : 创建一个context对象
const Context = React.createContext();

// * step2 : 使用Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// * step3 : 子组件消费context value： Consumer、contextType、useContext
// contextType只能使用在类组件中，并且只能订阅单一的context来源
// useContext只能用在函数组件和自定义hook中

// hoc 是个函数，接收组件作为参数，并且返回一个新的组件
export const connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps
) => (WrappedComponent) => (props) => {
  const store = useContext(Context);
  const {getState, dispatch} = store;

  const stateProps = mapStateToProps(getState());
  const dispatchProps = {dispatch};

  // 做订阅 取消订阅

  useEffect(() => {
    store.subscribe(() => {
      // 函数组件怎么forceUpdate
    });
  }, []);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}
