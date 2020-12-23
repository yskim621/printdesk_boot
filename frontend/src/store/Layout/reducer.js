import produce from 'immer';
import {
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_ERROR,
  MENU_CLICK_MOBILE_MENU,
  MENU_CHANGE_HAS_SUB_ITEM_STATUS,
  MENU_SET_CLASSNAMES,
  MENU_CONTAINER_ADD_CLASSNAME,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  menu: null,
  selectedMenuHasSubItems: true,
  containerClassnames: 'menu-default',
  menuClickCount: 0,
  menuHiddenBreakpoint: 768,
  subHiddenBreakpoint: 1440,
};

const layoutReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MENU:
        draft.loading = true;
        break;
      case GET_MENU_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.menu = action.payload;
        break;
      case GET_MENU_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case MENU_CLICK_MOBILE_MENU:
        draft.containerClassnames = action.payload.containerClassnames;
        draft.menuClickCount = action.payload.menuClickCount;
        break;
      case MENU_CHANGE_HAS_SUB_ITEM_STATUS:
        draft.selectedMenuHasSubItems = action.payload;
        break;
      case MENU_SET_CLASSNAMES:
        draft.containerClassnames = action.payload.containerClassnames;
        draft.menuClickCount = action.payload.menuClickCount;
        break;
      case MENU_CONTAINER_ADD_CLASSNAME:
        draft.containerClassnames = action.payload;
        break;
      // no default
    }
  });

export default layoutReducer;
