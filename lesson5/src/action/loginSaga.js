// takeEvery  处理监听
// call、 fork 调用异步操作
// put dispatch的封装

import {take, call, fork, put} from "redux-saga/effects";
import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";

// worker saga
function* loginHandle(action) {
  //先修改store中的loading为true
  yield put({type: REQUEST});
  try {
    // 现获取基本信息
    const res1 = yield call(LoginService.login, action.payload);
    // 再获取详细信息
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: LOGIN_SUCCESS, payload: res2});
  } catch (err) {
    yield put({type: LOGIN_FAILURE, payload: err});
  }
}

// watcher saga
function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle);

  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   // loginHandle(action)
  //   // call 阻塞型请求
  //   // fork 非阻塞
  //   yield fork(loginHandle, action);
  //   console.log("action", action); //sy-log
  // }
}

export default loginSaga;

function takeEvery(pattern, saga, ...args) {
  return fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
}
