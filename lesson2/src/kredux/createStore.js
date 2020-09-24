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
  // 一旦数据发生改变，需要做什么
  function subscribe(listener) {
    currentListeners.push(listener);
    // 取消订阅
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  // 做初始值，手动执行下dispatch
  dispatch({type: "REDUX/KKKKKKKKKB"});

  return {
    getState,
    dispatch,
    subscribe
  };
}
