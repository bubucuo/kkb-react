import {take, takeEvery, put, call, fork} from "redux-saga/effects";
import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";
// takeEvery 监听
// put 类比dispatch
// call 做阻塞型请求
// worker saga
function* loginHandle(action) {
  yield put({type: REQUEST});
  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({
      type: LOGIN_SUCCESS,
      payload: res2,
    });
  } catch (err) {
    yield put({type: LOGIN_FAILURE, payload: err});
  }
}

// watcher saga
function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle);

  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   // call 用于阻塞型请求
  //   // fork 用于非阻塞型请求
  //   yield fork(loginHandle, action);
  //   console.log("action", action); //sy-log
  // }
}

export default loginSaga;

// const takeEvery = (pattern, saga, ...args) =>
//   fork(function*() {
//     while (true) {
//       const action = yield take(pattern);
//       yield fork(saga, action);
//     }
//   });
