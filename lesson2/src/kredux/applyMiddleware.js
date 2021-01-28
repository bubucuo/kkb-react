export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);

    let dispatch = store.dispatch;
    // todo 加强dispatch
    let midAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    // 执行中间件数组
    const middlewareChain = middlewares.map((middleware) => middleware(midAPI));
    // 得到加强版的dispatch
    dispatch = compose(...middlewareChain)(store.dispatch);

    return {...store, dispatch};
  };
}

// 聚合函数
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
