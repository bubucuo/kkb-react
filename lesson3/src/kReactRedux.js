import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  useLayoutEffect,
} from "react";
// 使用context做数据跨层级传递
// 1. 创建context对象
const Context = React.createContext();
// 2. 使用Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// 子组件消费value
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrapperComponent
) => (props) => {
  const store = useContext(Context);

  // 状态值
  const stateProps = mapStateToProps(store.getState());
  let dispatchProps = {dispatch: store.dispatch};
  if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(store.dispatch);
  }

  // const [state, forceUpdate] = useState({});
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
  }, [store]);

  return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
};

// 功能函数
function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
  const obj = {};

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// 自定义hooks
export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

export function useSelector(selector) {
  const store = useStore();

  const selectedState = selector(store.getState());

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

function useStore() {
  const store = useContext(Context);
  return store;
}
