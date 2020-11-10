import LoginService from "../service/login";
import {LOGIN_SUCCESS, LOGIN_FAILURE, REQUEST, LOGIN_SAGA} from "./const";
import {call, fork, put, take} from "redux-saga/effects";

// 调用异步操作 call fork

//  状态更新 put

//  做监听  take takeEvery

//  redux-saga里是generator函数

// worker saga
function* loginHandle(action) {
  yield put({type: REQUEST});

  try {
    // 两个顺序异步请求
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    // 状态更新
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
  //   // call 阻塞型的任务
  //   // fork 非阻塞型
  //   yield fork(loginHandle, action);
  //   console.log("action", action); //sy-log
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
