import { createSelector } from 'reselect';
import { initialState } from './reducer';

const layoutSelector = (state) => state.layout || initialState;

const loadingSelector = () =>
  createSelector(layoutSelector, (state) => state.loading);

const errorSelector = () =>
  createSelector(layoutSelector, (state) => state.error);

const menuSelector = () =>
  createSelector(layoutSelector, (state) => state.menu);

const selectedMenuHasSubItemsSelector = () =>
  createSelector(layoutSelector, (state) => state.selectedMenuHasSubItems);

const containerClassnamesSelector = () =>
  createSelector(layoutSelector, (state) => state.containerClassnames);

const menuClickCountSelector = () =>
  createSelector(layoutSelector, (state) => state.menuClickCount);

const menuHiddenBreakpointSelector = () =>
  createSelector(layoutSelector, (state) => state.menuHiddenBreakpoint);

const subHiddenBreakpointSelector = () =>
  createSelector(layoutSelector, (state) => state.subHiddenBreakpoint);

export {
  loadingSelector,
  errorSelector,
  menuSelector,
  selectedMenuHasSubItemsSelector,
  containerClassnamesSelector,
  menuClickCountSelector,
  menuHiddenBreakpointSelector,
  subHiddenBreakpointSelector,
};
