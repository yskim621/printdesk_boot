import {
  GET_DEPARTMENT_LIST,
  GET_DEPARTMENT_LIST_SUCCESS,
  GET_DEPARTMENT_LIST_ERROR,
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_ERROR,
} from './constatns';

const getDepartmentListAction = () => {
  return {
    type: GET_DEPARTMENT_LIST,
  };
};

const getDepartmentListSuccessAction = (payload) => {
  return {
    type: GET_DEPARTMENT_LIST_SUCCESS,
    payload,
  };
};

const getDepartmentListErrorAction = (error) => {
  return {
    type: GET_DEPARTMENT_LIST_ERROR,
    payload: error,
  };
};

const addDepartmentAction = (index, name, remark) => {
  return {
    type: ADD_DEPARTMENT,
    payload: { index, name, remark },
  };
};

const addDepartmentSuccessAction = () => {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
  };
};

const addDepartmentErrorAction = (error) => {
  return {
    type: ADD_DEPARTMENT_ERROR,
    payload: error,
  };
};

export {
  getDepartmentListAction,
  getDepartmentListSuccessAction,
  getDepartmentListErrorAction,
  addDepartmentAction,
  addDepartmentSuccessAction,
  addDepartmentErrorAction,
};
