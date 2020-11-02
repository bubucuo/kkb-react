export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);

    let dispatch = store.dispatch;
    // todo 加强store.dispatch

    // 返回加强版，加强store.dispatch
    return {
      ...store,
      ...dispatch
    };
  };
}
