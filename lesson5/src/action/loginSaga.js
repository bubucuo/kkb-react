import {
  call,
  put,
  // takeEvery,
  take,
  fork,
} from "redux-saga/effects";
import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS} from "./const";

// call： 调用异步操作 dispatch
// put：状态更新 dispatch
// takeEvery：做saga监听
// worker saga
function* loginHandle(action) {
  try {
    // 先获取基本信息
    // 阻塞型 call
    let res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: LOGIN_SUCCESS, payload: {...res2}});
  } catch (err) {
    yield put({type: LOGIN_FAILURE, payload: err});
  }
}

// watcher saga
function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle);
  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   // 阻塞型 call
  //   // 非阻塞型 fork
  //   yield fork(loginHandle, action);
  //   console.log("哈哈哈哈", action); //sy-log
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
