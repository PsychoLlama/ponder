// @flow
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
    it('sets the selected note ID', () => {
      const noteId = 'note-uuid';
      const action = actions.editNote(noteId);
      const state = reducer(undefined, action);

      expect(state.note).toBe(noteId);
    });
  });

  describe('closeNote', () => {
    it('unsets the selected note ID', () => {
      const open = actions.editNote('note-uuid');
      const close = actions.closeNote();
      const state = reducer(reducer(undefined, open), close);

      expect(state.note).toBeNull();
    });
  });
});
