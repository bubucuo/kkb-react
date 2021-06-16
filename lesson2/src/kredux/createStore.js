export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // enhancer加强dispatch
    return enhancer(createStore)(reducer);
  }
  // 开辟一个空间存储状态
  let currentState;
  let currentListeners = [];
  // get
  function getState() {
    return currentState;
  }

  // set
  function dispatch(action) {
    // 先修改store state
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

  // 手动执行dispatch，加上默认值
  dispatch({type: "REDUX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx"});

  return {
    getState,
    dispatch,
    subscribe,
  };
}
