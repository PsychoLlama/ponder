// @flow
import { createAction } from 'redux-actions';

export const editNote = createAction(
  'NAVIGATION__OPEN_NOTE',
  (id: string) => id
);

export const closeNote = createAction(
  'NAVIGATION__CLOSE_NOTE',
  () => undefined
);
