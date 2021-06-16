// * 最终目的： 通过redux的store.dispatch修改状态

import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";
import {call, put, takeEvery, take, fork} from "redux-saga/effects";

// 调用异步 call fork
// put 修改状态，背后就是dispatch
// 做监听  take

// worker saga
function* loginHandle(action) {
  yield put({type: REQUEST});
  try {
    // 获取用户基本信息
    let res1 = yield call(LoginService.login, action.payload);
    // 获取用户更多信息
    let res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: LOGIN_SUCCESS, payload: res2});
  } catch (err) {
    yield put({type: LOGIN_FAILURE, payload: err});
  }
}

// watcher saga
function* loginSaga() {
  // yield takeEvery(LOGIN_SAGA, loginHandle);
  while (true) {
    const action = yield take(LOGIN_SAGA);
    // call 阻塞
    // fork 非阻塞
    yield fork(loginHandle, action);
    console.log("总是想吃肉扎办"); //sy-log
  }
}

// ajax.then(call)
// fork

export default loginSaga;
