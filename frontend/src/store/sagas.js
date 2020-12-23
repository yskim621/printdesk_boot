import { all, fork } from 'redux-saga/effects';
import loginSaga from './Login/saga';
import registerSaga from './Register/saga';
import layoutSaga from './Layout/saga';

function* rootSaga() {
  yield all([fork(loginSaga), fork(registerSaga), fork(layoutSaga)]);
}

export default rootSaga;
