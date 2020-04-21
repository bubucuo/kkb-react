export default function combineReducers(reducers) {
  // 返回一个组合之后的总的reducer
  return function combination(state = {}, action) {
    let nextState = {};
    let hasChanged = false;
    for (let key in reducers) {
      const reducer = reducers[key];
      const prevState = state[key];
      nextState[key] = reducer(prevState, action);
      hasChanged = nextState[key] !== state[key];
    }

    hasChanged = hasChanged || reducers.length != Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
}
