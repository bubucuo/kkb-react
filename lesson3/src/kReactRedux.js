import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useLayoutEffect
} from "react";

// 通过Context传递store
// *step1 创建一个Context对象
const Context = React.createContext();
// *step2 通过Provider组件传递value（store）
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// *step3 子组件接收 context value (Consumser\contextType\useContext)
// 方法1 connect
// hoc 函数，参数是组件，返回值是个新组件
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  const store = useContext(Context);
  const {getState, dispatch, subscribe} = store;
  // store state
  const stateProps = mapStateToProps(getState());

  let dispatchProps = {dispatch};

  if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  }
  // 让函数强制更新的方法
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  // const [, forceUpdate] = useState({});

  const forceUpdate = useForceUpdate();
  // * useEffect _ _  DOM变更  effect执行(订阅)
  // * useLayoutEffect __   DOM变更-effect执行(订阅)

  // 订阅
  //

  useLayoutEffect(() => {
    //有订阅 一定要有取消订阅
    const unsubscribe = store.subscribe(() => {
      // todo 让函数组件更新
      forceUpdate();
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

// hook只能用在函数组件或者是自定义hook
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

  // todo
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// 方法2 hooks
export function useSelector(selector) {
  const store = useStore();
  const {getState} = store;

  const selectState = selector(getState());

  const forceUpdate = useForceUpdate();
  // * useEffect _ _  DOM变更  effect执行(订阅)
  // * useLayoutEffect __   DOM变更-effect执行(订阅)

  // 订阅
  //

  useLayoutEffect(() => {
    //有订阅 一定要有取消订阅
    const unsubscribe = store.subscribe(() => {
      // todo 让函数组件更新
      forceUpdate();
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  return selectState;
}

function useStore() {
  const store = useContext(Context);
  return store;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}
