import React from "react";
// 使用context
// * step1: 先创建Context对象
const Context = React.createContext();

// * step2:  通过Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// * step3: 子组件消费value： Consumer、contextType、useContext
// hoc
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  const store = React.useContext(Context);

  const {getState, dispatch, subscribe} = store;

  const stateProps = mapStateToProps(getState());

  let dispatchProps = {dispatch};

  // mapDispatchToProps function | object
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  // const [state, forceUpdate] = React.useState({});

  // 选择useEffect (异步，也就是说有延迟的，好处是不阻塞dom渲染) 或者 useLayoutEffect
  // ___ __

  React.useLayoutEffect(() => {
    // * 亲 这里是订阅 （state一旦改变，则执行订阅函数，比如这里就是更新组件）
    const unsubscribe = store.subscribe(() => {
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
  let obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// ! hook
function useStore() {
  const store = React.useContext(Context);
  return store;
}

export function useSelector(selector) {
  const store = useStore();

  const {getState} = store;

  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  React.useLayoutEffect(() => {
    // * 亲 这里是订阅 （state一旦改变，则执行订阅函数，比如这里就是更新组件）
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    // 取消订阅
    return () => {
      unsubscribe();
    };
  }, [store]);

  const selectedState = selector(getState());
  return selectedState;
}

// 修改state
export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}
