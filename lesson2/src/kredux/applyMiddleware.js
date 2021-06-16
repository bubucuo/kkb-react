export default function applyMiddleware(...middlewares) {
  // 下面就是enhancer
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    // todo 加强dispatch
    const midAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    // 新的有操作store权限的中间件
    const chain = middlewares.map((middleware) => middleware(midAPI));

    // 加强的dispatch，一次性执行所有中间件和store.dispatch
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
