// @flow
import reducer from '../sections';
import { sections as initialState } from '../state';
import * as actions from '../../actions/notebook';

describe('Sections reducer', () => {
  it('returns state for unknown actions', () => {
    const state = reducer(undefined, { type: '@@init' });

    expect(state).toBe(initialState);
  });

  describe('editNote', () => {
    const createAction = patch => ({
      type: String(actions.editNote),
      payload: {
        id: 'mock-note-id',
        sections: [],
        title: '',
        ...patch,
      },
    });

    it('adds sections', () => {
      const section = {
        id: 'mock-section-id',
        type: 'markdown',
        content: '# Title',
      };

      const action = createAction({ sections: [section] });
      const state = reducer(undefined, action);

      const { type, content } = section;
      expect(state).toEqual({
        [section.id]: { type, content },
      });
    });
  });
});
