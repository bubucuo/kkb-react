export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 加强
    return enhancer(createStore)(reducer);
  }
  let currentState; // 仓库里的数据
  let currentListeners = []; // 监听函数

  // get
  function getState() {
    return currentState;
  }

  // set
  // reducer 定义了修改规则
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // state改变，执行订阅的函数
    // listener 就是订阅的监听函数
    currentListeners.forEach((listener) => listener());
    return action;
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

  // 手动执行一次dispatch 赋初始值
  dispatch({type: "REUDX/AAAAAAAAAAAAAAAAAAAAAAA"});

  return {
    getState,
    dispatch,
    subscribe,
  };
}
