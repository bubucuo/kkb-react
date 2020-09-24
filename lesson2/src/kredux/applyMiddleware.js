export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    // todo 增强dispatch done
    //
    // 这个是等下要给中间件
    const midApi = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };

    // 得到一个新的中间件的链，这个链上的中间件能获取到midApi
    const middlewareChain = middlewares.map(middleware => middleware(midApi));

    dispatch = compose(...middlewareChain)(store.dispatch);

    // 返回增强的store，其实把dispatch增强就行了
    return {
      ...store,
      dispatch
    };
  };
}

function compose(...funs) {
  // 这个空数组的兼容情况
  if (funs.length === 0) {
    return arg => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }
  // 这个返回值是个函数，这个函数执行的时候，f1, f2, f3会按照顺序挨个执行
  return funs.reduce((a, b) => (...args) => a(b(...args)));
}
