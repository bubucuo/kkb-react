export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    // todo 加强dispatch的

    return {
      ...store,
      dispatch,
    };
  };
}
