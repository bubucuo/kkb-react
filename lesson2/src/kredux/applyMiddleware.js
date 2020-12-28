export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    // 初始值dispatch
    let dispatch = store.dispatch;
    const middleAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    // todo 加强dispatch
    // middlewaresChain 与middlewares 不同，前者是有middleAPI的，
    // 他们两个都是函数数组
    const middlewaresChain = middlewares.map((middleware) =>
      middleware(middleAPI)
    );

    //得到加强版的dspatch
    dispatch = compose(...middlewaresChain)(store.dispatch);

    return {
      ...store,
      // 返回加强版的dispatch
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    // 返回一个函数
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
