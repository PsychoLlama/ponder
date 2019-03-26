// @flow
import reducer, { initialState } from '../notebook';
import * as actions from '../../actions/notebook';

jest.mock('@ponder/sdk');

describe('Notebooks reducer', () => {
  it('returns state for unknown actions', () => {
    const state = reducer(undefined, { type: '@@init' });

    expect(state).toBe(initialState);
  });

  describe('openRootNotebook', () => {
    const createAction = (payload = []) => ({
      type: String(actions.openRootNotebook),
      payload,
    });

    it('sets the path back to the root', () => {
      const stateWithNavigation = {
        ...initialState,
        path: ['notebook1'],
      };

      const state = reducer(stateWithNavigation, createAction());

      expect(state.path).toEqual([]);
    });

    it('adds note & notebook information to the map', () => {
      const items = [
        { type: 'notebook', title: 'Notebook title', id: 1 },
        { type: 'note', title: 'Note title', id: 2 },
      ];

      const action = createAction(items);
      const state = reducer(undefined, action);

      expect(state.contents.notebooks).toEqual({
        [1]: { title: 'Notebook title', id: 1 },
      });

      expect(state.contents.notes).toEqual({
        [2]: { title: 'Note title', id: 2 },
      });
    });

    it('wipes out the old note collections', () => {
      const withItems = {
        contents: {
          notebooks: {
            [2]: { title: 'Notebook', id: 2 },
          },
          notes: {
            [1]: { title: 'Note', id: 1 },
          },
        },
      };

      const state = reducer(withItems, createAction());

      expect(state.contents.notebooks).toEqual({});
      expect(state.contents.notes).toEqual({});
    });
  });

  describe('createNote', () => {
    it('sets the active note ID', () => {
      const action = actions.createNote({ notebook: 'a' });
      const state = reducer(undefined, action);

      expect(state.selectedNoteId).toEqual(expect.any(String));
    });

    it('adds the new note to the collection', () => {
      const action = actions.createNote({ notebook: 'a' });
      const state = reducer(undefined, action);
      const note = action.payload;

      expect(state.contents.notes).toMatchObject({
        [note.id]: {
          title: note.title,
          id: note.id,
        },
      });
    });
  });

  describe('editNote', () => {
    it('sets the selected note ID', () => {
      const noteId = 'note-uuid';
      const action = actions.editNote(noteId);
      const state = reducer(undefined, action);

      expect(state.selectedNoteId).toBe(noteId);
    });
  });

  describe('closeNote', () => {
    it('unsets the selected note ID', () => {
      const open = actions.editNote('note-uuid');
      const close = actions.closeNote();
      const state = reducer(reducer(undefined, open), close);

      expect(state.selectedNoteId).toBeNull();
    });
  });

  describe('renameNote', () => {
    const createAction = payload => ({
      type: String(actions.renameNote),
      payload: {
        title: 'New title',
        id: '1',
        ...payload,
      },
    });

    it('updates the corresponding note', () => {
      const notes = { [1]: { id: '1', title: 'Old title' } };
      const contents = { notes, notebooks: {} };
      const withItems = { ...initialState, contents };
      const state = reducer(withItems, createAction());

      expect(state.contents.notes).toEqual({
        [1]: { title: 'New title', id: '1' },
      });
    });
  });
});
