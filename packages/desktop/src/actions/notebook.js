// @flow
import * as sdk from '@ponder/sdk';
import { createAction } from 'redux-actions';
import { v4 as uuid } from 'uuid';

export const openRootNotebook = createAction(
  'notebook/open-root-notebook',
  () => sdk.readNotebook(sdk.NOTEBOOK_ROOT)
);

export const createNote = createAction(
  'notebook/create-note',
  ({ notebook }: { notebook: string }) => {
    const id = uuid();
    const title = '';
    const section = {
      type: 'markdown',
      content: '',
      id: uuid(),
    };

    // TODO: add support for richer action dispatching. This action is
    // optimistic only, which requires dropping the promise reference.
    (async () => {
      await sdk.createNote({
        title,
        notebook,
        id,
      });

      await sdk.insertSection(id, 0, section);
    })();

    return {
      title,
      notebook,
      id,
      sections: [section],
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

export const updateNoteSection = createAction(
  'notebook/update-section',
  async (config: { noteId: string, sectionIndex: number, content: string }) => {
    await sdk.updateSection(config.noteId, config.sectionIndex, section => {
      section.content = config.content;
    });

    return config;
  }
);
