import { NOTEBOOK_ROOT } from '@ponder/sdk';
import { v4 as uuid } from 'uuid';

import * as actions from '../../actions/notebook';
import * as mockedEffects from '../../effects/notebook';
import initializeStore from '../../utils/redux-store';

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

    effects.editNote.mockImplementation(async (noteId) => ({
      id: noteId,
      sections: [],
    }));
  });

  describe('createNote', () => {
    it('sets the active note ID', async () => {
      const store = await initializeStore();

      const { id } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      expect(store.getState().navigation.note).toEqual(id);
    });
  });

  describe('closeNote', () => {
    it('unsets the selected note ID', async () => {
      const store = await initializeStore();

      await store.dispatch(actions.createNote({ notebook: NOTEBOOK_ROOT }));
      store.dispatch(actions.closeNote());

      expect(store.getState().navigation.note).toBeNull();
    });
  });

  describe('editNote', () => {
    it('sets the selected note ID', async () => {
      const store = await initializeStore();
      const { id } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      store.dispatch(actions.closeNote());
      await store.dispatch(actions.editNote(id));

      expect(store.getState().navigation.note).toBe(id);
    });
  });

  describe('deleteNote', () => {
    it('closes the note', async () => {
      const store = await initializeStore();
      const { id } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      await store.dispatch(
        actions.deleteNote({ noteId: id, notebookId: NOTEBOOK_ROOT })
      );

      expect(store.getState().navigation.note).toBeNull();
    });

    it('only closes the note if that note was deleted', async () => {
      const store = await initializeStore();
      const { id: note1 } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      const { id: note2 } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      await store.dispatch(
        actions.deleteNote({ noteId: note1, notebookId: NOTEBOOK_ROOT })
      );

      expect(store.getState().navigation.note).toBe(note2);
    });
  });
});
