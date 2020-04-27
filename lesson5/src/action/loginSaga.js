import {call, put, takeEvery} from "redux-saga/effects";
import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, REQUEST} from "./const";
import LoginService from "../service/login";

// worker saga

function* loginHandle(action) {
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
  yield takeEvery("loginSaga", loginHandle);
}

export default loginSaga;
