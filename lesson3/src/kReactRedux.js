import React, {
  useContext,
  useEffect,
  useReducer,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
// context跨层级数据传递
// step1 创建Context对象
const Context = React.createContext();
// step2 通过Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// step3 子组件消费value
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  const store = useContext(Context);

  const stateProps = mapStateToProps(store.getState());
  let dispatchProps = {dispatch: store.dispatch};

  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(store.dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
  }

  // const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const forceUpdate = useForceUpdate();
  // useEffect  dom变更___effect
  // useLayoutEffect dom变更-effect
  useLayoutEffect(() => {
    // 订阅的是函数，是dispatch之后要执行的函数
    store.subscribe(() => {
      forceUpdate();
    });
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
export function bindActionCreators(creators, dispatch) {
  let obj = {};

  // todo 组装obj
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// hook只能用在函数组件或者是自定义hook
function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}

// hooks
export function useSelector(selector) {
  const store = useStore();
  const selectedState = selector(store.getState());

  const forceUpdate = useForceUpdate();
  // useEffect  dom变更___effect
  // useLayoutEffect dom变更-effect
  useLayoutEffect(() => {
    // 订阅
    store.subscribe(() => {
      forceUpdate();
    });
  }, [store]);

  return selectedState;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

export function useStore() {
  const store = useContext(Context);
  return store;
}
