import produce from 'immer';
import {
  GET_DEPARTMENT_LIST,
  GET_DEPARTMENT_LIST_SUCCESS,
  GET_DEPARTMENT_LIST_ERROR,
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_ERROR,
} from './constatns';

export const initialState = {
  loading: false,
  error: null,
  index: 0,
  name: '',
  remark: null,
  departmentList: null,
};

const basicReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_DEPARTMENT_LIST:
        draft.loading = true;
        break;
      case GET_DEPARTMENT_LIST_SUCCESS:
        draft.loading = false;
        draft.departmentList = action.payload;
        break;
      case GET_DEPARTMENT_LIST_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case ADD_DEPARTMENT:
        draft.loading = true;
        break;
      case ADD_DEPARTMENT_SUCCESS:
        draft.departmentList = null;
        draft.loading = false;
        draft.error = null;
        break;
      case ADD_DEPARTMENT_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      // no default
    }
  });

export default basicReducer;
