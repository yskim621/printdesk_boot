import {
  CHECK_ID,
  CHECK_ID_SUCCESS,
  CHECK_ID_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

const checkIdAction = (id) => {
  return {
    type: CHECK_ID,
    payload: id,
  };
};

const checkIdSuccessAction = (response) => {
  return {
    type: CHECK_ID_SUCCESS,
    payload: response,
  };
};

const checkIdErrorAction = (error) => {
  return {
    type: CHECK_ID_ERROR,
    payload: error,
  };
};

const registerAction = (form) => {
  return {
    type: REGISTER,
    payload: form,
  };
};

const registerSuccessAction = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const registerErrorAction = (error) => {
  return {
    type: REGISTER_ERROR,
    payload: error,
  };
};

export {
  checkIdAction,
  checkIdSuccessAction,
  checkIdErrorAction,
  registerAction,
  registerSuccessAction,
  registerErrorAction,
};
