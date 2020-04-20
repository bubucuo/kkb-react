export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    let store = createStore(reducer);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const middlewareChain = middlewares.map(md => md(midApi));

    dispatch = compose(...middlewareChain)(store.dispatch);

    return {
      ...store,
      // 加强dispatch， 比如说能够接受function promise
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
  return funcs.reduce((a, b) => (...args) => {
    return a(b(...args));
  });
}
