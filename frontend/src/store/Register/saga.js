import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';
import { CHECK_ID, REGISTER } from './constants';
import {
  checkIdSuccessAction,
  checkIdErrorAction,
  registerSuccessAction,
  registerErrorAction,
} from './actions';
import { idSelector, formSelector } from './selectors';
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
  const form = yield select(formSelector());

  try {
    yield call(registerRequest, form);
    yield put(registerSuccessAction());
    setTimeout(() => {
      Router.push('/login');
    }, 3000);
  } catch (error) {
    yield put(registerErrorAction(error));
  }
}

export default function* registerSaga() {
  yield all([takeLatest(CHECK_ID, checkId), takeLatest(REGISTER, register)]);
}
