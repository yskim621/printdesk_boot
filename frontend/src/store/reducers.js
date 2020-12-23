import { combineReducers } from 'redux';
import loginReducer from './Login/reducer';
import registerReducer from './Register/reducer';
import layoutReducer from './Layout/reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  layout: layoutReducer,
});

export default rootReducer;
