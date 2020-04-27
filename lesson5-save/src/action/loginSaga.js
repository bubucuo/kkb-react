import {
  call,
  put,
  // takeEvery,
  take,
  fork
} from "redux-saga/effects";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REQUEST,
  LOGIN_SAGA
} from "./const";
import LoginService from "../service/login";

// worker saga

function* loginHandle(action) {
  yield put({type: REQUEST});
  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: LOGIN_SUCCESS, payload: {...res1, ...res2}});
  } catch (err) {
    yield put({type: LOGIN_FAILURE, payload: err});
  }
}

// watcher saga
function* loginSaga(params) {
  yield takeEvery(LOGIN_SAGA, loginHandle);

  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   // call是一个会阻塞的effect，即generator在调用结束之前不能执行的或处理任何其他事情
  //   yield call(loginHandle, action);
  //   console.log("call", action); //sy-log
  //   // fork是无阻塞型任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被fork的任务结束
  //   // yield fork(loginHandle, action);
  //   // console.log("fork", action); //sy-log
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
