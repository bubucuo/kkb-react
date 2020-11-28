export default function createStore(reducer, enhancer) {
  // 如果需要加强
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    // state改变，执行订阅的函数
    currentListeners.forEach(listener => listener());
  }

  // 订阅
  function subscribe(listener) {
    currentListeners.push(listener);
    // 取消订阅
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({type: "REDUX/QQQQQQQQQQQQQQQQQQq"});

  return {
    getState,
    dispatch,
    subscribe
  };
}
