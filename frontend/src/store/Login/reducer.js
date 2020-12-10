import produce from 'immer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: null,
  form: {},
};

const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
        draft.loading = true;
        draft.error = null;
        draft.form = action.payload;
        break;
      case LOGIN_SUCCESS:
        draft.form = {};
        draft.loading = false;
        draft.error = null;
        break;
      case LOGIN_ERROR:
        draft.loading = false;
        draft.error = action.payload;
      // no default
    }
  });

export default loginReducer;
