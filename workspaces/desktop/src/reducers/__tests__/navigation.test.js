// @flow
import reducer, { initialState } from '../navigation';
import * as actions from '../../actions/navigation';

describe('Navigation reducer', () => {
  it('returns default state for unknown actions', () => {
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

      expect(state.path).toHaveLength(0);
    });

    it('shows all the notebook contents', () => {
      const items = [{ type: 'note', title: 'Title', id: 1 }];
      const action = createAction(items);
      const state = reducer(undefined, action);

      expect(state.items).toEqual(items);
    });
  });
});
