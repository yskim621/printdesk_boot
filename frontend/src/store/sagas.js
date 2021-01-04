import { all, fork } from 'redux-saga/effects';
import loginSaga from './Login/saga';
import registerSaga from './Register/saga';
import layoutSaga from './Layout/saga';
import basicSaga from './Basic/saga';

function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(layoutSaga),
    fork(basicSaga),
  ]);
}

export default rootSaga;
