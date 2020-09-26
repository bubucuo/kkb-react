import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
  useLayoutEffect
} from "react";

// 想要使用Context传递数据
// todo step1: 先创建一个Context对象
const Context = React.createContext();

// todo step2: 通过Provider组件传递context value
export function Provider({children, store}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// todo step3: 子组件接收context value
// todo step3-1: 用connect
// connect 是个hoc，接收组件作为参数，然后返回一个新组件，
// 新的组件上可以由你自己选择映射state和dispatch
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps //数据类型是undefined、object、function
) => WrappedComponent => props => {
  //首先获取store
  const store = useContext(Context);
  // 获取state的函数
  const {getState, dispatch, subscribe} = store;
  const stateProps = mapStateToProps(getState()); // 获取 你自己选择的state

  let dispatchProps = {};

  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  } else {
    dispatchProps = {dispatch};
  }

  // 组件得更新
  // const [, forceUpdate] = useState({});
  // const [ignored, forceUpdate] = useState(0);
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  const forceUpdate = useForceUpdate();

  //这里选择useLayoutEffect而不是useEffect，是因为useEffect在组件更新完之后会有延迟，有可能会漏掉一些forceUpdate
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // forceUpdate(ignored => ignored + 1);
      forceUpdate();
    });

    // 这个函数在组件将要卸载的时候执行
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

// 复用forceUpdate
function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState(prev => prev + 1);
  }, []);

  return update;
}

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

// todo step3-2: 用hook方法
export function useSelector(selector) {
  const store = useStore();

  const {getState} = store;

  const selectedState = selector(getState());
  return selectedState;
}

export function useStore() {
  const store = useContext(Context);

  const forceUpdate = useForceUpdate();

  //这里选择useLayoutEffect而不是useEffect，是因为useEffect在组件更新完之后会有延迟，有可能会漏掉一些forceUpdate
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // forceUpdate(ignored => ignored + 1);
      forceUpdate();
    });

    // 这个函数在组件将要卸载的时候执行
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  return store;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}
