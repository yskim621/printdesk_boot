import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

const loginAction = (form) => {
  return {
    type: LOGIN,
    payload: form,
  };
};

const loginSuccessAction = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

const loginErrorAction = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export { loginAction, loginSuccessAction, loginErrorAction };
