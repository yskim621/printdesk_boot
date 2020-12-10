import { all, fork } from 'redux-saga/effects';
import loginSaga from './Login/saga';
import registerSaga from './Register/saga';

function* rootSaga() {
  yield all([fork(loginSaga), fork(registerSaga)]);
}

export default rootSaga;
