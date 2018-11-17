// @flow
import reducer, { initialState } from '../notebooks';
import * as actions from '../../actions/notebooks';

describe('Notebooks reducer', () => {
  it('returns state for unknown actions', () => {
    const state = reducer(undefined, { type: '@@init' });

    expect(state).toBe(initialState);
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
});
