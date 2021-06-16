export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    // todo get super dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    // 这个时候middleware就能访问store了
    // middlewaresChain是个能够访问store的中间件数组
    const middlewaresChain = middlewares.map((middleware) =>
      middleware(midApi)
    );

    // super dispatch
    dispatch = compose(...middlewaresChain)(store.dispatch);

    return {...store, dispatch};
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
