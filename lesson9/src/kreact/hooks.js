import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";
import {isFn, HookPassive, HookLayout, areHookInputsEqual} from "./utils";

let workInProgressHook = null;
// 当前正在工作的fiber
let currentlyRenderingFiber = null;

// 老fiber的hook，也就是workInProgressHook对应的在老fiber上的hook
let currentHook = null;

export function renderHooks(wip) {
  currentlyRenderingFiber = wip;
  currentlyRenderingFiber.memoizedState = null;
  currentlyRenderingFiber.updateQueue = null;
  workInProgressHook = null;
}

// fiber(memoizedState)->hook0(next)->hook1(next)->hook2(next)->null
// workInProgressHook=hook2 当前的hook
function updateWorkInProgressHook() {
  let hook;
  // todo
  const current = currentlyRenderingFiber.alternate;
  if (current) {
    // 不是初次渲染，是更新，意味着可以在老hook基础上更新
    currentlyRenderingFiber.memoizedState = current.memoizedState;
    if (workInProgressHook) {
      // 不是第一个hook
      hook = workInProgressHook = workInProgressHook.next;
      currentHook = currentHook.next;
    } else {
      // 是第一个hook
      hook = workInProgressHook = current.memoizedState;
      currentHook = current.memoizedState;
    }
  } else {
    // 是初次渲染，需要初始化hook
    currentHook = null;
    hook = {
      memoizedState: null, //状态值
      next: null, // 指向下一个hook或者null
    };
    if (workInProgressHook) {
      // 不是第一个hook
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // 是第一个hook
      workInProgressHook = currentlyRenderingFiber.memoizedState = hook;
    }
  }

  return hook;
}

export function useReducer(reducer, initialState) {
  /**
   * memoizedState 状态值
   * next 指向下一个hook
   */
  const hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    // 组件初次渲染
    hook.memoizedState = initialState;
  }

  const dispatch = (action) => {
    hook.memoizedState = reducer(hook.memoizedState, action);
    currentlyRenderingFiber.alternate = {...currentlyRenderingFiber};
    scheduleUpdateOnFiber(currentlyRenderingFiber);
  };

  return [hook.memoizedState, dispatch];
}

export function useEffect(create, deps) {
  return updateEffectIml(HookPassive, create, deps);
}

export function useLayoutEffect(create, deps) {
  return updateEffectIml(HookLayout, create, deps);
}

function updateEffectIml(hookFlags, create, deps) {
  const hook = updateWorkInProgressHook();

  // 更新阶段检查deps是否发生变化，发生变化才执行create
  if (currentHook) {
    // deps是否发生变化
    const prevEffect = currentHook.memoizedState;
    if (deps) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(deps, prevDeps)) {
        return;
      }
    }
  }

  const effect = {hookFlags, create, deps};

  hook.memoizedState = effect;

  if (currentlyRenderingFiber.updateQueue) {
    currentlyRenderingFiber.updateQueue.push(effect);
  } else {
    currentlyRenderingFiber.updateQueue = [effect];
  }
}
