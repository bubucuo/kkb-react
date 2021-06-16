// takeEvery  做监听
// call 调用异步操作
// put 修改状态（dispatch）
import {
  take,
  // takeEvery,
  call,
  fork,
  put,
} from "redux-saga/effects";
import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";

// worker saga
function* loginHandle(action) {
  yield put({type: REQUEST});

  // 异步
  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: LOGIN_SUCCESS, payload: res2});
  } catch (err) {
    yield put({type: LOGIN_FAILURE, payload: err});
  }
}

// watcher saga
// pattern
function* loginSaga() {
  // yield takeEvery(LOGIN_SAGA, loginHandle);
  while (true) {
    const action = yield take(LOGIN_SAGA);
    // call 阻塞调用
    // yield call(loginHandle, action); // loginHandle(action)
    // fork 非阻塞调用
    yield fork(loginHandle, action); // loginHandle(action)
    console.log("action", action); //sy-log
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
