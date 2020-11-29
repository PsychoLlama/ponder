import { EntityType, SectionType, NOTEBOOK_ROOT } from '@ponder/sdk';
import { v4 as uuid } from 'uuid';

import * as actions from '../../actions/notebook';
import initializeStore from '../../utils/redux-store';
import * as mockedEffects from '../../effects/notebook';

jest.mock('../../effects/notebook');

const effects = mockedEffects as jest.Mocked<typeof mockedEffects>;

describe('Notes reducer', () => {
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
    it('adds the note', async () => {
      const store = await initializeStore();
      const note = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      expect(store.getState().notes).toEqual({
        [note.id]: {
          title: note.title,
          sections: [],
        },
      });
    });
  });

  describe('renameNote', () => {
    it('renames the note', async () => {
      const store = await initializeStore();
      const { id } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      const title = 'New Title';
      await store.dispatch(actions.renameNote({ id, title }));

      expect(store.getState().notes[id]).toHaveProperty('title', title);
    });
  });

  describe('openRootNotebook', () => {
    it('indexes all the notes', async () => {
      effects.openRootNotebook.mockResolvedValue([
        { type: EntityType.Note, id: '1', title: 'Note #1', sections: [] },
        { type: EntityType.Note, id: '2', title: 'Note #2', sections: [] },
        { type: EntityType.Note, id: '3', title: 'Note #3', sections: [] },
      ]);

      const store = await initializeStore();
      await store.dispatch(actions.openRootNotebook());

      expect(store.getState().notes).toEqual({
        [1]: { title: 'Note #1', sections: [] },
        [2]: { title: 'Note #2', sections: [] },
        [3]: { title: 'Note #3', sections: [] },
      });
    });

    it('ignores notebooks', async () => {
      effects.openRootNotebook.mockResolvedValue([
        { type: EntityType.Notebook, id: '1', title: 'Notebook' },
      ]);

      const store = await initializeStore();
      await store.dispatch(actions.openRootNotebook());

      expect(store.getState().notes).toEqual({});
    });
  });

  describe('editNote', () => {
    it('loads the note sections', async () => {
      const section = { id: '1', type: SectionType.RichText, content: '# Hi' };
      const noteId = 'mock-note-id';

      effects.editNote.mockResolvedValue({ id: noteId, sections: [section] });
      effects.openRootNotebook.mockResolvedValue([
        { type: EntityType.Note, id: noteId, title: 'Note #1', sections: [] },
      ]);

      const store = await initializeStore();
      await store.dispatch(actions.editNote(noteId));

      expect(store.getState().notes[noteId]).toMatchObject({
        sections: [section.id],
      });
    });
  });

  describe('deleteNote', () => {
    it('removes the corresponding note', async () => {
      const store = await initializeStore();

      const { id } = await store.dispatch(
        actions.createNote({ notebook: NOTEBOOK_ROOT })
      );

      await store.dispatch(
        actions.deleteNote({ noteId: id, notebookId: NOTEBOOK_ROOT })
      );

      expect(store.getState().notes).toEqual({});
    });
  });
});
