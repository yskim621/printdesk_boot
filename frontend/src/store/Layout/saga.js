import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_MENU } from './constants';
import { getMenuSuccessAction, getMenuErrorAction } from './actions';
import getMenuRequest from './requests';

function* getMenu() {
  try {
    const response = yield call(getMenuRequest);
    yield put(getMenuSuccessAction(response.data));
  } catch (error) {
    yield put(getMenuErrorAction(error));
  }
}

export default function* layoutSaga() {
  yield takeLatest(GET_MENU, getMenu);
}
