export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // enhancer是用于加强store.dispatch的
    return enhancer(createStore)(reducer);
  }

  // store state
  let currentState;

  // 监听函数数组
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

    // * 返回取消订阅函数，这样才能成对出现
    return () => {
      // todo 大家课后自己改吧，用filter、splice都行
      currentListeners = [];
    };
  }

  // 手动执行dispatch，派发初始值
  dispatch({type: "REDUX/YYYYYYYYYY"});

  return {
    getState,
    dispatch,
    subscribe
  };
}
