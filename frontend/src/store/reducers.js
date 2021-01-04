import { combineReducers } from 'redux';
import loginReducer from './Login/reducer';
import registerReducer from './Register/reducer';
import layoutReducer from './Layout/reducer';
import basicReducer from './Basic/reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  layout: layoutReducer,
  basic: basicReducer,
});

export default rootReducer;
