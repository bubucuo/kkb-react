export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 加强store.dispatch,先得到store
    return enhancer(createStore)(reducer);
  }

  let currentState; //状态值
  let currentListeners = [];
  // get
  function getState() {
    return currentState;
  }

  // set
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // state改变，执行订阅的函数
    currentListeners.forEach((listener) => listener());
  }

  // 订阅和取消订阅必须要成对出现
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({type: "REDUX/Ooooooooooo"});

  return {
    getState,
    dispatch,
    subscribe,
  };
}
