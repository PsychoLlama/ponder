import { NOTEBOOK_ROOT, EntityType } from '@ponder/sdk';

import reducer from '../notebooks';
import * as actions from '../../actions/notebook';

describe('Notebooks reducer', () => {
  describe('openRootNotebook', () => {
    const createAction = (payload = []) => ({
      type: String(actions.openRootNotebook),
      payload,
    });

    it('adds note & notebook information to the map', () => {
      const items = [
        { type: EntityType.Notebook, title: 'Notebook title', id: 1 },
        { type: EntityType.Note, title: 'Note title', id: 2 },
      ];

      const action = createAction(items);
      const state = reducer(undefined, action);

      expect(state).toEqual({
        [NOTEBOOK_ROOT]: {
          title: '',
          contents: [
            { type: EntityType.Notebook, id: 1 },
            { type: EntityType.Note, id: 2 },
          ],
        },
      });
    });
  });

  describe('createNote', () => {
    const createAction = <T,>(patch?: T) => ({
      type: String(actions.createNote),
      payload: {
        title: 'New note',
        notebook: NOTEBOOK_ROOT,
        id: '<note-id>',
        ...patch,
      },
    });

    it('adds the note to the corresponding notebook', () => {
      const withNotebook = {
        steve: {
          contents: [],
          title: '',
        },
      };

      const action = createAction({ notebook: 'steve' });
      const state = reducer(withNotebook, action);

      expect(state.steve.contents).toEqual([
        { type: EntityType.Note, id: action.payload.id },
      ]);
    });
  });

  describe('deleteNote', () => {
    const createAction = () => ({
      type: String(actions.deleteNote),
      payload: {
        noteId: 'note-id',
        notebookId: 'notebook-id',
      },
    });

    it('removes the note from the notebook list', () => {
      const action = createAction();
      const { notebookId, noteId } = action.payload;
      const withNotebook = {
        [notebookId]: {
          title: '',
          contents: [{ type: EntityType.Note, id: noteId }],
        },
      };

      const state = reducer(withNotebook, action);

      expect(state[notebookId].contents).toEqual([]);
    });
  });
});
