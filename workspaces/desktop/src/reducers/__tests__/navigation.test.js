// @flow
import * as notebookActions from '../../actions/notebooks';
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

  describe('createNote', () => {
    const createAction = (
      payload = { title: '', id: '2', notebook: 'id' }
    ) => ({
      type: String(notebookActions.createNote),
      payload,
    });

    it('prepends a new note', () => {
      const items = [{ type: 'note', title: 'Title', id: '1' }];
      const withItems = { ...initialState, items };
      const state = reducer(withItems, createAction());

      expect(state.items).toHaveLength(2);
      expect(state.items[0].id).toBe('2');
    });
  });
});
