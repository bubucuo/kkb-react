import React, {useContext, useEffect} from "react";

// 通过Context传递store
// *step1 创建一个Context对象
const Context = React.createContext();
// *step2 通过Provider组件传递value（store）
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// *step3 子组件接收 context value (Consumser\contextType\useContext)
// hoc 函数，参数是组件，返回值是个新组件
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  const store = useContext(Context);
  const {getState, dispatch, subscribe} = store;
  // store state
  const stateProps = mapStateToProps(getState());

  const dispatchProps = {dispatch};

  useEffect(() => {
    store.subscribe(() => {
      // forceUpdate();
    });
  }, []);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

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
