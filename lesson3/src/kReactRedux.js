import React, {useContext} from "react";

const Context = React.createContext();

// 用法connect(({user})=>({user}) , {} )(这里是个组件)
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToPorps
) => WrappedComponent => props => {
  //props是WrappedComponent的属性值
  const store = useContext(Context);
  const {getState} = store;
  // todo 获取state
  const stateProps = mapStateToProps(getState());
  return <WrappedComponent {...props} {...stateProps} />;
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
