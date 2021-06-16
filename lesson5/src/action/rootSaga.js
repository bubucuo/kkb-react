import {all} from "redux-saga/effects";
import loginSaga from "./loginSaga";

function* rootSaga() {
  yield all([loginSaga()]);
}

export default rootSaga;
