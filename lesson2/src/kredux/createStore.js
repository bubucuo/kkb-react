export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let currentListeners = [];

  // get
  function getState() {
    return currentState;
  }

  // set
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // store state改变，执行订阅的函数
    currentListeners.forEach((listener) => listener());

    return action;
  }

  // 订阅 和 取消订阅要成对出现
  function subscribe(listener) {
    currentListeners.push(listener);
    // 取消订阅
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({type: "REDUX?KKKKKKKKKKKKKKKK"});

  return {
    getState,
    dispatch,
    subscribe,
  };
}
