export default function combineReducers(reducers) {
  // 返回reducer
  return function combination(state = {}, action) {
    let nextState = {};
    let hasChanged = false;
    for (let key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);

      hasChanged = nextState[key] !== state[key];
    }

    hasChanged =
      hasChanged || Object.keys[state].length !== Object.keys[state].length;

    return hasChanged ? nextState : state;
  };
}
