export default function applyMiddleware(...midddlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    // 加强dispatch
    // todo
    // 用中间件
    const midAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };
    const chain = midddlewares.map((midddleware) => midddleware(midAPI));

    // 加强版的dispatch
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
