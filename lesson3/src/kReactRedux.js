import React from "react";
// context
// ! step1:  创建一个context对象
const Context = React.createContext();

// ! step3: 利用connect得到新组件，新组件上有state和dispatch
// mapStateToProps : function
// mapDispatchToProps: obejct|function
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  // 获取store
  const store = React.useContext(Context);
  const {dispatch, getState, subscribe} = store;
  // todo 给新返回的组件的props上加上store state和dispatch，这个dispatch不是特指dispatch方法
  const stateProps = mapStateToProps(getState());
  let dispatchProps = {
    dispatch
  };

  if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  }

  //函数组件中引起更新
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

  // _ _
  React.useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 执行组件更新 forceUpdate
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

// ! step2 : 使用Context.Provider把store传递下来
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
export function bindActionCreators(creators, dispatch) {
  let obj = {};

  // todo  遍历
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// !step3 自定义hook
export function useSelector(selector) {
  // 获取store state
  const store = useStore();
  const {getState} = store;
  const selectedState = selector(getState());

  //函数组件中引起更新
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

  // _ _
  React.useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 执行组件更新 forceUpdate
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

function useStore() {
  const store = React.useContext(Context);
  return store;
}

// ! step3
export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}
