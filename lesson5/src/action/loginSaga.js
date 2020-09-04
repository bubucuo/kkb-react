// （thunk）异步请求 call
// （dispatch）更新状态 put

import {call, put, takeEvery} from "redux-saga/effects";
import LoginService from "../service/login";

// worker saga
function* loginHandle(action) {
  yield put({type: "REQUEST"});
  try {
    // 同步的方式执行异步
    // call是阻塞
    // fork 是非阻塞
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    // 更新state
    yield put({type: "LOGIN_SUCCESS", payload: res2});
  } catch (err) {
    yield put({type: "LOGIN_FAILURE", payload: err});
  }
}

// watcher saga
function* loginSaga() {
  yield takeEvery("LOGIN_SAGA", loginHandle);
}

export default loginSaga;
