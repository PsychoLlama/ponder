// @flow
import { createNote as persistNote } from '@ponder/sdk';
import { createAction } from 'redux-actions';
import uuid from 'uuid/v4';

export const createNote = createAction(
  'notebooks/create-note',
  ({ notebook }: { notebook: string }) => {
    const id = uuid();

    // Optimistic only. Drop the promise.
    persistNote({
      title: '',
      notebook,
      id,
    });

    return {
      title: '',
      notebook,
      id,
    };
  }
);

export const editNote = createAction('notebooks/open-note', (id: string) => id);
export const closeNote = createAction('notebooks/close-note', () => undefined);
