export default function createStore(reducer) {
  let currentState;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    // state改变，执行订阅的函数
    currentListeners.forEach((listener) => listener());
  }

  // 订阅
  function subscribe(listener) {
    currentListeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
