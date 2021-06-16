let deadline = 0; // 判断是否终止
const slice = 5; // 1000/60

// 存储任务
const taskQueue = [];
const timerQueue = [];

export function scheduleCallback(callback) {
  const newTask = {callback};
  taskQueue.push(newTask);
  schedule(flushWork);
}

// 任务调度
function schedule(callback) {
  timerQueue.push(callback);
  postMessage();
}

function postMessage() {
  const channel = new MessageChannel();
  const {port1, port2} = channel;

  port1.onmessage = () => {
    // 相当于把timeQueue中的数据复制到了tem中，同时清空了timeQueue
    let tem = timerQueue.splice(0, timerQueue.length);
    tem.forEach((c) => c());
  };
  port2.postMessage(null);
}

// 执行任务
function flushWork() {
  deadline = getCurrentTime() + slice;
  let currentTask = taskQueue[0];
  while (currentTask && !shouldYield()) {
    const {callback} = currentTask;
    callback();
    taskQueue.shift();
    currentTask = taskQueue[0];
  }
}

export function shouldYield() {
  return getCurrentTime() >= deadline;
}

export function getCurrentTime() {
  return performance.now();
}
