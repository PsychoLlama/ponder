// @flow
import reducer, { initialState } from '../navigation';
import * as actions from '../../actions/navigation';

describe('Navigation reducer', () => {
  it('returns state for unknown actions', () => {
    const state = reducer(undefined, { type: '@@init' });

    expect(state).toBe(initialState);
  });

  describe('openNote', () => {
    it('sets the selected note ID', () => {
      const noteId = 'note-uuid';
      const action = actions.openNote(noteId);
      const state = reducer(undefined, action);

      expect(state.selectedNoteId).toBe(noteId);
    });
  });

  describe('closeNote', () => {
    it('unsets the selected note ID', () => {
      const open = actions.openNote('note-uuid');
      const close = actions.closeNote();
      const state = reducer(reducer(undefined, open), close);

      expect(state.selectedNoteId).toBeNull();
    });
  });
});
