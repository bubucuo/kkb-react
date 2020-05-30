export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    // todo 加强dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };

    // !
    // 生成一个中间件的链，给每个节点添加midAPi
    const middlewaresChain = middlewares.map(middleware => middleware(midApi));
    // 加强版的dispatch
    dispatch = compose(...middlewaresChain)(dispatch);
    // !

    return {
      ...store,
      dispatch
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // return funcs.reduce((a, b) => (...args) => a(b(...args)));
  // return funcs.reduce((a, b) => (...args) => a(b(...args)));
  return funcs.reduce((a, b) => {
    return (...args) => {
      return a(b(...args));
    };
  });
}
