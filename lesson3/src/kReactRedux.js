import React, {useContext, useEffect, useReducer, useLayoutEffect} from "react";

const ReduxContext = React.createContext();

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedCompoent => props => {
  const store = useContext(ReduxContext);

  const {getState, dispatch, subscribe} = store;

  const stateProps = mapStateToProps(getState());

  let dispatchProps = {dispatch};
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      // forceUpdate
      //? 函数组件中怎么实现forceUpdate
      forceUpdate();
    });

    // 组件卸载时候执行
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  // todo
  return <WrappedCompoent {...props} {...stateProps} {...dispatchProps} />;
};

export function Provider({store, children}) {
  return (
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
  );
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
  // return () => dispatch(creator());
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// 自定义hook，返回store
export function useStore() {
  const store = useContext(ReduxContext);
  return store;
}

// 自定义hook
export function useSelector(selector) {
  const store = useStore();

  const {getState, subscribe} = store;

  const selectState = selector(getState());

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      // forceUpdate
      //? 函数组件中怎么实现forceUpdate
      forceUpdate();
    });

    // 组件卸载时候执行
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
