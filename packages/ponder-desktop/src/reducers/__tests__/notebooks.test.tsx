import { NOTEBOOK_ROOT, EntityType } from '@ponder/sdk';
import { v4 as uuid } from 'uuid';

import * as actions from '../../actions/notebook';
import initializeStore from '../../utils/redux-store';
import * as mockedEffects from '../../effects/notebook';

jest.mock('../../effects/notebook');

const effects = mockedEffects as jest.Mocked<typeof mockedEffects>;

describe('Notebooks reducer', () => {
  beforeEach(() => {
    effects.openRootNotebook.mockResolvedValue([]);
    effects.createNote.mockImplementation(async () => ({
      id: uuid(),
      title: 'Untitled',
      sections: [],
      notebook: NOTEBOOK_ROOT,
    }));
  });

  describe('openRootNotebook', () => {
    it('adds note & notebook information to the map', async () => {
      effects.openRootNotebook.mockResolvedValue([
        { type: EntityType.Notebook, title: 'Notebook title', id: '1' },
        { type: EntityType.Note, title: 'Note title', id: '2', sections: [] },
      ]);

      const store = await initializeStore();
      await store.dispatch(actions.openRootNotebook());

      expect(store.getState().notebooks).toEqual({
        [NOTEBOOK_ROOT]: {
          title: '',
          contents: [
            { type: EntityType.Notebook, id: '1' },
            { type: EntityType.Note, id: '2' },
          ],
        },
      });
    });
  });

  describe('createNote', () => {
    it('adds the note to the corresponding notebook', async () => {
      const store = await initializeStore();
      const { id } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      expect(store.getState().notebooks[NOTEBOOK_ROOT].contents).toEqual([
        { type: EntityType.Note, id },
      ]);
    });
  });

  describe('deleteNote', () => {
    it('removes the note from the notebook list', async () => {
      const store = await initializeStore();

      const { id } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      await store.dispatch(
        actions.deleteNote({ noteId: id, notebookId: NOTEBOOK_ROOT })
      );

      expect(store.getState().notebooks[NOTEBOOK_ROOT].contents).toEqual([]);
    });
  });
});
