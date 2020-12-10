import { combineReducers } from 'redux';
import loginReducer from './Login/reducer';
import registerReducer from './Register/reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export default rootReducer;
