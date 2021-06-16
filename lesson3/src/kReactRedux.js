import React, {
  useCallback,
  useContext,
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

// 跨层级数据传递
// context三步走
//* step1: 创建一个Context对象
const Context = React.createContext();

// * step2： Provider传递store
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// * step3： 子孙组件接收store
//1) Consumer
//2）contextType  只能用在类组件，只能订阅单一的context来源
//3)useContext 只能用在函数组件或者是自定义hook
// * step3(1):
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  // 子孙组件接收跨层级传递下来的store
  const store = useContext(Context);

  const stateProps = mapStateToProps(store.getState());

  let dispatchProps = {dispatch: store.dispatch};

  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(store.dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
  }
  // const [state, setState] = useState(0);
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const forceUpdate = useForceUpdate();

  // useEffect__（订阅）DOM变更
  // useLayoutEffect-DOM变更
  useLayoutEffect(() => {
    store.subscribe(() => {
      // forceUpdate()
      forceUpdate();
    });
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

function useForceUpdate() {
  const [state, setState] = useState(0);
  // const [, setState] = useReducer((x) => x + 1, 0);

  const update = useCallback(() => {
    setState((prev) => prev + 1);
    // setState();
  }, []);

  return update;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};

  // todo 遍历creators
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// * hook
// * step3(2):
// 返回dispatch
export function useDispatch() {
  const store = useContext(Context);
  return store.dispatch;
}

//返回状态
export function useSelector(selctor) {
  const store = useContext(Context);
  const selectedState = selctor(store.getState());

  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    store.subscribe(() => {
      // forceUpdate()
      forceUpdate();
    });
  }, [store]);

  return selectedState;
}
