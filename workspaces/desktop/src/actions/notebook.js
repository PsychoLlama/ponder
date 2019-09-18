// @flow
import * as sdk from '@ponder/sdk';
import { createAction } from 'redux-actions';
import uuid from 'uuid/v4';

export const openRootNotebook = createAction(
  'notebook/open-root-notebook',
  () => sdk.readNotebook(sdk.NOTEBOOK_ROOT)
);

export const createNote = createAction(
  'notebook/create-note',
  ({ notebook }: { notebook: string }) => {
    const id = uuid();
    const title = '';

    // Optimistic only. Drop the promise.
    sdk.createNote({
      title,
      notebook,
      id,
    });

    return {
      title,
      notebook,
      id,
    };
  }
);

export const renameNote = createAction(
  'notebook/rename-note',
  (update: { id: string, title: string }) => {
    // Optimistic only. Drop the promise.
    sdk.renameNote(update);

    return update;
  }
);

export const editNote = createAction(
  'notebook/edit-note',
  async (id: string) => {
    const { sections } = await sdk.readNote(id);

    return { id, sections };
  }
);

export const closeNote = createAction('notebook/close-note', () => undefined);
