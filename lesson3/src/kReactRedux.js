import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

// 数据跨层级传递 三步走
// 1. 生成context对象
const Context = React.createContext();

// 2. Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// 3. 子组件消费context value
// contextType  只能用在类组件中，并且只能订阅单一的context来源
//Consumer 注意使用格式 (ctx)=>{return xxx}
// useContext  只能用在函数组件和自定义hook中
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  // 取到store
  const store = useContext(Context);

  const stateProps = mapStateToProps(store.getState()); // store.getState
  let dispatchProps = {dispatch: store.dispatch}; // store.dispatch

  if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(store.dispatch);
  }

  // 组件更新
  // ! 函数组件更新的几种办法以及背后原理机制
  // 订阅dispatch后要执行事件 forceUpdate
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const forceUpdate = useForceUpdate();
  // const [, forceUpdate] = useState({});

  //! useEffect useLayoutEffect
  //useEffect： dom渲染___参数函数
  //useLayoutEffect： dom渲染|参数函数

  // ! 有订阅一定要有取消订阅 有注册一定要有注销
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // forceUpdate
      forceUpdate();
    });
    // 取消订阅
    return () => {
      unsubscribe();
    };
  }, [store]);

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

// 自定义hook
function useForceUpdate() {
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
}

export function useSelector(selector) {
  const store = useStore();
  const selectedState = selector(store.getState());

  // 订阅与取消订阅
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store]);

  return selectedState;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

function useStore() {
  const store = useContext(Context);
  return store;
}
