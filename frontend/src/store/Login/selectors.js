import { createSelector } from 'reselect';
import { initialState } from './reducer';

const loginSelector = (state) => state.login || initialState;

const errorSelector = () =>
  createSelector(loginSelector, (state) => state.error);
const loadingSelector = () =>
  createSelector(loginSelector, (state) => state.loading);
const formSelector = () => createSelector(loginSelector, (state) => state.form);

export { errorSelector, loadingSelector, formSelector };
