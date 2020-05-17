import reducer from '../sections';
import { sections as initialState } from '../state';
import * as actions from '../../actions/notebook';

describe('Sections reducer', () => {
  it('returns state for unknown actions', () => {
    const state = reducer(undefined, { type: '@@init' });

    expect(state).toBe(initialState);
  });

  describe('editNote', () => {
    const createAction = <T,>(patch?: T) => ({
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

  describe('createNote', () => {
    const createAction = <T,>(patch?: T) => ({
      type: String(actions.createNote),
      payload: {
        id: 'mock-note-id',
        title: '',
        sections: [],
        ...patch,
      },
    });

    it('adds sections', () => {
      const section = {
        id: 'mock-section-id',
        type: 'markdown',
        content: '',
      };

      const action = createAction({ sections: [section] });
      const state = reducer(undefined, action);

      expect(state).toEqual({
        [section.id]: {
          type: section.type,
          content: section.content,
        },
      });
    });
  });
});
