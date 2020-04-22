import React, {useContext, useReducer, useLayoutEffect} from "react";

const Context = React.createContext();

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappendComponent => props => {
  const store = useContext(Context);
  const {dispatch, getState, subscribe} = store;
  const stateProps = mapStateToProps(getState());
  let dispatchProps = {dispatch};
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return <WrappendComponent {...props} {...stateProps} {...dispatchProps} />;
};

export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

export function useSelector(selector) {
  const store = useStore();
  const {getState, subscribe} = store;
  const selectedState = selector(getState());

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
  }, []);

  return selectedState;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

export function useStore() {
  const store = useContext(Context);
  return store;
}
