// @flow
import { createAction } from 'redux-actions';

export const createNote = createAction(
  'NOTEBOOKS__CREATE_NOTE',
  () => 'temp-note-id'
);

export const editNote = createAction(
  'NOTEBOOKS__OPEN_NOTE',
  (id: string) => id
);

export const closeNote = createAction('NOTEBOOKS__CLOSE_NOTE', () => undefined);
