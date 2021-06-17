import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";
import {areHookInputsEqual, HookLayout, HookPassive} from "./utils";

// fiber.memoizedState 第0个hook
// hook = {
// memoizedState : 状态值, effect:{create,deps}
// next // 下一个hook
// }
// 当前正在工作fiber
let currentlyRenderingFiber = null;
// 当前正在工作的hook
let workInProgressHook = null;
// 当前正在工作的hook对应的老hook
let currentHook = null;

export function renderHooks(fiber) {
  currentlyRenderingFiber = fiber;
  currentlyRenderingFiber.memoizedState = null; // hook0
  currentlyRenderingFiber.updateQueueOfEffect = [];
  currentlyRenderingFiber.updateQueueOfLayout = [];

  workInProgressHook = null;
}

function updateWorkInProgressHook() {
  let hook = null;

  // todo get hook
  // 老节点
  let current = currentlyRenderingFiber.alternate;
  if (current) {
    // 更新阶段 新的hook在老的hook基础上更新
    currentlyRenderingFiber.memoizedState = current.memoizedState;
    if (workInProgressHook) {
      // 不是第0个hook
      hook = workInProgressHook = workInProgressHook.next;
      currentHook = currentHook.next;
    } else {
      // 是第0个hook
      hook = workInProgressHook = current.memoizedState;
      currentHook = current.memoizedState;
    }
  } else {
    // 初次渲染阶段
    currentHook = null;
    hook = {
      memoizedState: null, // 状态值
      next: null, // 下一个hook
    };
    if (workInProgressHook) {
      // 不是第0个hook
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // 是第0个hook
      workInProgressHook = currentlyRenderingFiber.memoizedState = hook;
    }
  }

  return hook;
}

export function useReducer(reducer, initalState) {
  const hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    // 初次渲染
    hook.memoizedState = initalState;
  }

  const dispatch = (action) => {
    hook.memoizedState = reducer(hook.memoizedState, action);
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

export function updateEffectIml(hookFlag, create, deps) {
  const hook = updateWorkInProgressHook();

  const effect = {hookFlag, create, deps};

  // 组件更新的时候，且依赖项没有发生变化
  if (currentHook) {
    const prevEffect = currentHook.memoizedState;
    if (deps) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(deps, prevDeps)) {
        return;
      }
    }
  }

  hook.memoizedState = effect;
  if (hookFlag & HookPassive) {
    currentlyRenderingFiber.updateQueueOfEffect.push(effect);
  } else if (hookFlag & HookLayout) {
    currentlyRenderingFiber.updateQueueOfLayout.push(effect);
  }
}

// fiber（firstEffect）->effect0-(nextEffect)-》effec1（lastEffect）
