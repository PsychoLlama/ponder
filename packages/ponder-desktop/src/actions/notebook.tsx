import { createAction } from 'retreon';

import * as effects from '../effects/notebook';

export const openRootNotebook = createAction.async(
  'notebook/open-root-notebook',
  effects.openRootNotebook
);

export const createNote = createAction.async(
  'notebook/create-note',
  effects.createNote
);

export const renameNote = createAction.async(
  'notebook/rename-note',
  effects.renameNote
);

export const editNote = createAction.async(
  'notebook/edit-note',
  effects.editNote
);

export const closeNote = createAction('notebook/close-note');

export const updateNoteSection = createAction.async(
  'notebook/update-section',
  effects.updateNoteSection
);

export const deleteNote = createAction.async(
  'notebook/delete-note',
  effects.deleteNote
);
