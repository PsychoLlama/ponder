import reducer from '../navigation';
import * as actions from '../../actions/notebook';
import { navigation } from '../state';

jest.mock('@ponder/sdk');

describe('Notebooks reducer', () => {
  it('returns state for unknown actions', () => {
    const state = reducer(undefined, { type: '@@init' });

    expect(state).toBe(navigation);
  });

  describe('openRootNotebook', () => {
    const createAction = (payload = []) => ({
      type: String(actions.openRootNotebook),
      payload,
    });

    it('sets the path back to the root', () => {
      const stateWithNavigation = {
        ...navigation,
        path: ['notebook1'],
      };

      const state = reducer(stateWithNavigation, createAction());

      expect(state.path).toEqual([]);
    });
  });

  describe('createNote', () => {
    it('sets the active note ID', () => {
      const action = actions.createNote({ notebook: 'a' });
      const state = reducer(undefined, action);

      expect(state.note).toEqual(action.payload.id);
    });
  });

  describe('editNote', () => {
    const createAction = (id: string) => ({
      type: String(actions.editNote),
      payload: { id, sections: [] },
    });

    it('sets the selected note ID', () => {
      const noteId = 'note-uuid';
      const action = createAction(noteId);
      const state = reducer(undefined, action);

      expect(state.note).toBe(noteId);
    });
  });

  describe('closeNote', () => {
    const createEditNoteAction = (id) => ({
      type: String(actions.closeNote),
      payload: id,
    });

    it('unsets the selected note ID', () => {
      const open = createEditNoteAction('note-uuid');
      const close = actions.closeNote();
      const state = reducer(reducer(undefined, open), close);

      expect(state.note).toBeNull();
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

    it('closes the note', () => {
      const action = createAction();
      const withNavigation = {
        ...navigation,
        note: action.payload.noteId,
      };

      const state = reducer(withNavigation, action);

      expect(state.note).toBeNull();
    });

    it('only closes the note if that note was deleted', () => {
      const action = createAction();
      const withNavigation = {
        ...navigation,
        note: 'unrelated-note',
      };

      const state = reducer(withNavigation, action);

      expect(state.note).not.toBeNull();
    });
  });
});
