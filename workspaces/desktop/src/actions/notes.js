// @flow
import { createAction } from 'redux-actions';

export const setTitle = createAction(
  'NOTE__SET_TITLE',
  (title: string) => title
);
