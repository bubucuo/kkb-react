// *
export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);

    let dispatch = store.dispatch;
    // todo 加强store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };

    const middlewareChain = middlewares.map(middleware => middleware(midApi));
    // 重新赋值一个函数
    dispatch = compose(...middlewareChain)(store.dispatch);

    // 返回加强版，加强store.dispatch
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
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
