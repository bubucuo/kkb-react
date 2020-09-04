import {LOGIN_SAGA, LOGIN_SUCCESS, REQUEST, LOGIN_FAILURE} from "./const.js";
import LoginService from "../service/login";
import {call, put, take, fork} from "redux-saga/effects";
// 调用异步操作 call
// 状态更新 （dispatch）put
// 做监听 take takeEvery

// worker saga
function* loginHandle(action) {
  yield put({
    type: REQUEST
  });
  try {
    // 调用异步操作
    const res = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res);
    yield put({
      type: LOGIN_SUCCESS,
      payload: res2
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
  yield takeEvery(LOGIN_SAGA, loginHandle);
  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   // call 是阻塞型的
  //   // fork 无阻塞型
  //   yield fork(loginHandle, action);
  //   console.log("action", action);
  // }
}

export default loginSaga;

const takeEvery = (pattern, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
