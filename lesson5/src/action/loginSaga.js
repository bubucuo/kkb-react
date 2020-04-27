// 调用异步操作 call fork
// 状态更新 put
// 做监听 take

import {
  call,
  fork,
  put,
  take
  // takeEvery
} from "redux-saga/effects";
import {LOGIN_SAGA, LOGIN_SUCCESS, LOGIN_FAILURE, REQUEST} from "./const";
import LoginService from "../service/login";

//  worker saga
// 调用异步操作 call
// 状态更新 put
function* loginHandle(action) {
  yield put({
    type: REQUEST
  });
  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: LOGIN_SUCCESS, payload: res2});
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: err
    });
  }
}
// watcher saga
function* loginSaga(params) {
  yield takeEvery(LOGIN_SAGA, loginHandle);

  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   yield call(loginHandle, action);
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
