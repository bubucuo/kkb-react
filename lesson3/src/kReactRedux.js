import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

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
  let dispatchProps = {dispatch};

  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }
  // 函数组件的forceUpdate
  // const [, forceUpdate] = React.useReducer((x) => x + 1, 0); // 小李 小徐 小林
  // const [, forceUpdate] = React.useState({}); //小林

  const forceUpdate = useForceUpdate();
  // 订阅state的变更
  // useEffect _DOM更新_ _effect执行_
  // useLayoutEffect _DOM更新__effect执行_
  // 如果用useEffect， DOM更新之后延迟执行effect，也就是说延迟执行订阅
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 如果state改变，则更新组件
      forceUpdate();
    });
    // 组件将要卸载之前执行取消订阅
    return () => {
      unsubscribe();
    };
  }, [store]);

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

// ! 函数组件的forceUpdate如何实现
// 方法1 const [ignored, forceUpdate] = useReducer(x => x + 1, 0); 小李 小徐 小林
// 方法2 const [,forceUpdate] = useState({}) 小林
//方法3 自定义hook
function useForceUpdate() {
  const [state, setState] = useState(0);

  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}

// hooks
// get
export function useSelector(selector) {
  const store = useStore();

  const {getState} = store;

  const selectorState = selector(getState());

  const forceUpdate = useForceUpdate();
  // 订阅state的变更
  // useEffect _DOM更新_ _effect执行_
  // useLayoutEffect _DOM更新__effect执行_
  // 如果用useEffect， DOM更新之后延迟执行effect，也就是说延迟执行订阅
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 如果state改变，则更新组件
      forceUpdate();
    });
    // 组件将要卸载之前执行取消订阅
    return () => {
      unsubscribe();
    };
  }, [store]);

  return selectorState;
}
// set
export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

export function useStore() {
  const store = useContext(Context);
  return store;
}
