// 调用异步操作 call
// 状态更新 put
// 做监听 takeEvery

import {
  call,
  fork,
  take,
  // takeEvery,
  put
} from "redux-saga/effects";
import LoginService from "../service/login";
import {LOGIN_SAGA, LOGIN_SUCCESS, LOGIN_FAILURE, REQUEST} from "./const";

// worker saga
function* loginHandle(action) {
  yield put({
    type: REQUEST
  });
  try {
    // 调用异步操作
    let res = yield call(LoginService.login, action.payload);
    let res1 = yield call(LoginService.getMoreUserInfo, res);
    // 状态更新;
    yield put({
      type: LOGIN_SUCCESS,
      payload: {...res1}
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: err
    });
  }
}

// watcher saga

function* loginSaga() {
  // yield takeEvery(LOGIN_SAGA, loginHandle);

  while (true) {
    console.log("asasss"); //sy-log
    const action = yield take(LOGIN_SAGA);
    // call 阻塞型调用 就generator函数在调用结束之前不能执行或者处理其他事情
    // fork非阻塞型调用 任务会在后台启动 调用者可以继续自己的流程 不用等待fork结束
    yield call(loginHandle, action);
    console.log("action", action);
  }
}

const takeEvery = (pattern, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });

export default loginSaga;
