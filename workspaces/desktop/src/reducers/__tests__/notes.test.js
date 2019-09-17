// @flow
import reducer from '../notes';
import * as actions from '../../actions/notebook';
import { notes } from '../state';

describe('Notes reducer', () => {
  it('returns state for unknown actions', () => {
    const state = reducer(undefined, { type: '@@init' });

    expect(state).toBe(notes);
  });

  describe('createNote', () => {
    const createAction = patch => ({
      type: String(actions.createNote),
      payload: {
        title: 'New note',
        notebook: '<notebook-id>',
        id: '<random-id>',
        ...patch,
      },
    });

    it('adds the note', () => {
      const action = createAction();
      const state = reducer(undefined, action);

      expect(state).toEqual({
        [action.payload.id]: {
          title: action.payload.title,
          sections: [],
        },
      });
    });
  });

  describe('renameNote', () => {
    const createAction = patch => ({
      type: String(actions.renameNote),
      payload: {
        id: 'note-id',
        title: 'New title',
        ...patch,
      },
    });

    it('renames the note', () => {
      const action = createAction();
      const withNote = {
        [action.payload.id]: { title: 'Old title', sections: [] },
      };

      const state = reducer(withNote, action);

      expect(state[action.payload.id]).toMatchObject({
        title: action.payload.title,
      });
    });
  });

  describe('openRootNotebook', () => {
    const createAction = patch => ({
      type: String(actions.openRootNotebook),
      payload: patch || [
        { type: 'note', id: 1, title: 'Note #1' },
        { type: 'note', id: 2, title: 'Note #2' },
        { type: 'note', id: 3, title: 'Note #3' },
      ],
    });

    it('indexes all the notes', () => {
      const action = createAction();
      const state = reducer(undefined, action);

      expect(state).toEqual({
        [1]: { title: 'Note #1', sections: [] },
        [2]: { title: 'Note #2', sections: [] },
        [3]: { title: 'Note #3', sections: [] },
      });
    });

    it('ignores notebooks', () => {
      const action = createAction([
        { type: 'notebook', id: 1, title: 'Notebook' },
      ]);

      const state = reducer(undefined, action);

      expect(state).toEqual({});
    });
  });
});
