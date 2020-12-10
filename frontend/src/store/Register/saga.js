import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';
import { CHECK_ID, REGISTER } from './constants';
import {
  checkIdSuccessAction,
  checkIdErrorAction,
  registerSuccessAction,
  registerErrorAction,
} from './actions';
import { idSelector, passwordSelector, emailSelector } from './selectors';
import { checkIdRequest, registerRequest } from './requests';

function* checkId() {
  const id = yield select(idSelector());

  try {
    const response = yield call(checkIdRequest, id);
    yield put(checkIdSuccessAction(response.data));
  } catch (error) {
    yield put(checkIdErrorAction(error));
  }
}

function* register() {
  const id = yield select(idSelector());
  const email = yield select(emailSelector());
  const password = yield select(passwordSelector());

  try {
    yield call(registerRequest, id, email, password);
    yield put(registerSuccessAction());
    Router.push('/register/init');
  } catch (error) {
    yield put(registerErrorAction(error));
  }
}

export default function* registerSaga() {
  yield all([takeLatest(CHECK_ID, checkId), takeLatest(REGISTER, register)]);
}
