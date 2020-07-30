import React, {useContext, useEffect, useReducer, useLayoutEffect} from "react";

//Provider在index.js，把store传递下来，用到了context
// 所有的子组件都有机会接收到store

const Context = React.createContext();
// 如何使用：connect(  ({count}) => ({count}), { add: ()=>({type: 'ADD})})(Cmp)
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  // 读取store state
  const store = useContext(Context);
  const {getState, dispatch, subscribe} = store;
  const stateProps = mapStateToProps(getState());
  // dispatch object | function
  let dispatchProps = {dispatch};
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  // 这里实现了函数组件版本的forceUpdate，可去参考官网
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  //  _ _
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      // store state 发生改变  forceUpdate是强制更新
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

// 提供者 提供store 因为store当中有state dispatch subscribe
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
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

//以下是hook方法
export function useSelector(selector) {
  const store = useStore();
  const {getState, subscribe} = store;
  const selectedState = selector(getState());

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  //  _ _
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      // store state 发生改变  forceUpdate是强制更新
      forceUpdate();
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
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
