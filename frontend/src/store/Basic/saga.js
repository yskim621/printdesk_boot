import { select, call, put, takeLatest } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { GET_DEPARTMENT_LIST, ADD_DEPARTMENT } from './constatns';
import {
  getDepartmentListSuccessAction,
  getDepartmentListErrorAction,
  addDepartmentSuccessAction,
  addDepartmentErrorAction,
} from './actions';
import { getDepartmentListRequest } from './requests';

function* getDepartmentList() {
  const list = [
    { index: 1, name: '경영기획부', remark: '-' },
    { index: 2, name: '영업관리부', remark: '-' },
    { index: 3, name: '생산관리부', remark: '-' },
  ];

  try {
    yield call(getDepartmentListRequest, cookie.get('token'));
    yield put(getDepartmentListSuccessAction(list));
  } catch (error) {
    yield put(getDepartmentListErrorAction(error));
  }
}

export default function* basicSaga() {
  yield takeLatest(GET_DEPARTMENT_LIST, getDepartmentList);
}
