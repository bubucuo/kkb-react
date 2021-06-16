import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";

// fiber.memoizedState 第0个hook
// hook = {
// memoizedState : 状态值
// next // 下一个hook

// 当前正在工作fiber
let currentlyRenderingFiber = null;
// 当前正在工作的hook
let workInProgressHook = null;

export function renderHooks(fiber) {
  currentlyRenderingFiber = fiber;
  currentlyRenderingFiber.memoizedState = null; // hook0
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
    } else {
      // 是第0个hook
      hook = workInProgressHook = current.memoizedState;
    }
  } else {
    // 初次渲染阶段
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
