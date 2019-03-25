// @flow
import { createAction } from 'redux-actions';

export const createNote = createAction(
  'notebooks/create-note',
  () => 'temp-note-id'
);

export const editNote = createAction('notebooks/open-note', (id: string) => id);
export const closeNote = createAction('notebooks/close-note', () => undefined);
