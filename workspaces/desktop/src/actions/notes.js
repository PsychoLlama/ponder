// @flow
import { createAction } from 'redux-actions';

export const setTitle = createAction(
  'notes/set-title',
  (title: string) => title
);
