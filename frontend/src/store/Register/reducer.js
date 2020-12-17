import produce from 'immer';
import {
  CHECK_ID,
  CHECK_ID_SUCCESS,
  CHECK_ID_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  id: '',
  form: {},
  validId: false,
};

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHECK_ID:
        draft.id = action.payload;
        break;
      case CHECK_ID_SUCCESS:
        draft.error = null;
        draft.validId = action.payload;
        break;
      case CHECK_ID_ERROR:
        draft.error = action.payload;
        break;
      case REGISTER:
        draft.loading = true;
        draft.form = action.payload;
        break;
      case REGISTER_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.id = '';
        draft.validId = false;
        draft.form = {};
        break;
      case REGISTER_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      // no default
    }
  });

export default registerReducer;
