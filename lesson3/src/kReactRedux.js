import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

// ! 跨层级数据传递
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
  // 数据仓库
  const store = useContext(Context);
  // 数据仓库的获取数据和修改数据的方法
  const {getState, dispatch} = store;

  const stateProps = mapStateToProps(getState());
  let dispatchProps = {dispatch};
  // 函数
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    // 对象
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  // * 函数组件中的forceUpdate
  const forceUpdate = useForceUpdate();
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [ignored, forceUpdate] = useState({});

  // 做订阅 取消订阅
  // useEffect ：_组件渲染_   __执行callback(订阅、取消订阅)_
  // useLayoutEffect ：_组件渲染__执行callback(订阅、取消订阅)_
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 函数组件怎么forceUpdate
      forceUpdate();
    });

    // 组件卸载之前取消订阅
    return () => {
      unsubscribe();
    };
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

// 自定义hook， 方便复用
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
  let obj = {};

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

export function useSelector(selector) {
  const store = useStore();

  const selectedState = selector(store.getState());

  // * 函数组件中的forceUpdate
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 函数组件怎么forceUpdate
      forceUpdate();
    });

    // 组件卸载之前取消订阅
    return () => {
      unsubscribe();
    };
  }, [store]);

  return selectedState;
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
