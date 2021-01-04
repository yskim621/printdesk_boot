import { createSelector } from 'reselect';
import { initialState } from './reducer';

const basicSelector = (state) => state.basic || initialState;

const loadingSelector = () =>
  createSelector(basicSelector, (state) => state.loading);
const errorSelector = () =>
  createSelector(basicSelector, (state) => state.error);
const indexSelector = () =>
  createSelector(basicSelector, (state) => state.index);
const nameSelector = () => createSelector(basicSelector, (state) => state.name);
const remarkSelector = () =>
  createSelector(basicSelector, (state) => state.remark);
const departmentListSelector = () =>
  createSelector(basicSelector, (state) => state.departmentList);

export {
  loadingSelector,
  errorSelector,
  indexSelector,
  nameSelector,
  remarkSelector,
  departmentListSelector,
};
