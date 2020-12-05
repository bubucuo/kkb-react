// get set 状态

// call 异步请求
// put修改状态

import {take, takeEvery, call, fork, put} from "redux-saga/effects";
import {LOGIN_SAGA, LOGIN_SUCCESS, LOGIN_FAILURE, REQUEST} from "./const";
import LoginService from "../service/login";

// worker saga
function* loginHandle(action) {
  // 修改loading状态
  yield put({
    type: REQUEST
  });

  // 发起请求
  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    // 修改状态 请求成功
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
  // yield takeEvery(LOGIN_SAGA, loginHandle);
  while (true) {
    const action = yield take(LOGIN_SAGA);

    // call  有阻塞
    //  fork  副作用 非阻塞
    yield fork(loginHandle, action);
    console.log("asas", action);
  }
}

export default loginSaga;
