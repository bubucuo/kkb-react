export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let currentListeners = [];
  // 获取store state
  function getState() {
    return currentState;
  }

  // 修改状态
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // store state已经发生了变化
    // next step: 通知组件
    currentListeners.forEach(listener => listener());
  }
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      // 简单置空，大家可以自己实现过滤
      currentListeners = [];
    };
  }

  dispatch({type: "KKKKREDUX/OOOOOO"});

  return {
    getState,
    dispatch,
    subscribe
  };
}
