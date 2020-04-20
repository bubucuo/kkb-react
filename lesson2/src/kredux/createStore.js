export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let curerntListeners = [];

  // 获取store的state
  function getState() {
    return currentState;
  }

  // 更改store
  function dispatch(action) {
    // store里面数据就更新了
    currentState = reducer(currentState, action);

    // 执行订阅事件
    curerntListeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    curerntListeners.push(listener);

    return () => {
      curerntListeners = [];
    };
  }

  // 初始化
  dispatch({type: "KKKKKK/REDUX"});

  return {
    getState,
    dispatch,
    subscribe
  };
}
