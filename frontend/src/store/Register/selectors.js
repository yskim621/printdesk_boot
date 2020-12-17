import { createSelector } from 'reselect';
import { initialState } from './reducer';

const registerSelector = (state) => state.register || initialState;

const loadingSelector = () =>
  createSelector(registerSelector, (state) => state.loading);
const errorSelector = () =>
  createSelector(registerSelector, (state) => state.error);
const idSelector = () => createSelector(registerSelector, (state) => state.id);
const validIdSelector = () =>
  createSelector(registerSelector, (state) => state.validId);
const formSelector = () =>
  createSelector(registerSelector, (state) => state.form);

export {
  loadingSelector,
  errorSelector,
  idSelector,
  validIdSelector,
  formSelector,
};
