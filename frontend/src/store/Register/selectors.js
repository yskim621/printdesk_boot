import { createSelector } from 'reselect';
import { initialState } from './reducer';

const registerSelector = (state) => state.register || initialState;

const loadingSelector = () =>
  createSelector(registerSelector, (state) => state.loading);
const errorSelector = () =>
  createSelector(registerSelector, (state) => state.error);
const idSelector = () => createSelector(registerSelector, (state) => state.id);
const emailSelector = () =>
  createSelector(registerSelector, (state) => state.email);
const passwordSelector = () =>
  createSelector(registerSelector, (state) => state.password);
const validIdSelector = () =>
  createSelector(registerSelector, (state) => state.validId);

export {
  loadingSelector,
  errorSelector,
  idSelector,
  emailSelector,
  passwordSelector,
  validIdSelector,
};
