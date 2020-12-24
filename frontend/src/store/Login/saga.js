import { select, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { loginSuccessAction, loginErrorAction } from './actions';
import { formSelector } from './selectors';
import loginRequest from './requests';

function* login() {
  const form = yield select(formSelector());
  try {
    const res = yield call(loginRequest, form);
    yield put(loginSuccessAction(res));
  } catch (error) {
    yield put(loginErrorAction(error));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
