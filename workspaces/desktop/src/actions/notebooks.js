// @flow
import * as sdk from '@ponder/sdk';
import { createAction } from 'redux-actions';
import uuid from 'uuid/v4';

export const createNote = createAction(
  'notebooks/create-note',
  ({ notebook }: { notebook: string }) => {
    const id = uuid();

    // Optimistic only. Drop the promise.
    sdk.createNote({
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

export const renameNote = createAction(
  'notebooks/rename-note',
  (update: { id: string, title: string }) => {
    // Optimistic only. Drop the promise.
    sdk.renameNote(update);

    return update;
  }
);

export const editNote = createAction('notebooks/open-note', (id: string) => id);
export const closeNote = createAction('notebooks/close-note', () => undefined);
