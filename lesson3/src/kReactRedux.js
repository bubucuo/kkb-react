import React, {useContext, useReducer, useEffect, useLayoutEffect} from "react";

const Context = React.createContext();

// 用法connect(({user})=>({user}) , {} )(这里是个组件)
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  //props是WrappedComponent的属性值
  const store = useContext(Context);
  const {getState, dispatch, subscribe} = store;
  // todo 获取state
  const stateProps = mapStateToProps(getState());
  let dispatchProps = {
    dispatch
  };

  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  // 函数组件实现forceUpdate的方法
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
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

export function Provider({children, store}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

function bindActionCreator(creator, dispatch) {
  return (...arg) => dispatch(creator(...arg));
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
  const {getState, subscribe} = store;
  const selectState = selector(getState());
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
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

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

function useStore() {
  const store = useContext(Context);
  return store;
}
