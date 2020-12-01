import React from "react";
// 使用context
// * step1: 先创建Context对象
const Context = React.createContext();

// * step2:  通过Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// * step3: 子组件消费value： Consumer、contextType、useContex
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  const store = React.useContext(Context);

  const {getState, dispatch, subscribe} = store;

  const stateProps = mapStateToProps(getState());

  const dispatchProps = {dispatch};

  React.useEffect(() => {
    store.subscribe(() => {
      // forceUpdate
    });
  }, []);

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
