export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    // todo 加强dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };

    const middlewaresChain = middlewares.map(middleware => middleware(midApi));

    // 是个函数
    dispatch = compose(...middlewaresChain)(store.dispatch);

    // 聚合之后的dispatch一旦执行，所有中间件也要按照顺序执行，还要修改状态（store.dispatch）

    //加强完dispatch之后
    return {
      ...store,
      dispatch
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    // 返回一个函数
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  // 返回了一个聚合函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
