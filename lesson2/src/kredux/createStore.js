export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 增强createStore的dispatch
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let currentListeners = [];

  // 获取状态
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
    // 返回取消订阅的函数
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  // 手动执行以下dispatch，赋上初始值
  dispatch({type: "KKKKKKKKREDUX/OOOOOOOOOO"});

  return {
    getState,
    dispatch,
    subscribe
  };
}
