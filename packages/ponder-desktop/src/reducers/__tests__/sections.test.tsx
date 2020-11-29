import { SectionType, EntityType, NOTEBOOK_ROOT } from '@ponder/sdk';
import { v4 as uuid } from 'uuid';

import * as actions from '../../actions/notebook';
import initializeStore from '../../utils/redux-store';
import * as mockedEffects from '../../effects/notebook';

jest.mock('../../effects/notebook');

const effects = mockedEffects as jest.Mocked<typeof mockedEffects>;

describe('Sections reducer', () => {
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

  describe('editNote', () => {
    it('loads sections', async () => {
      const noteId = 'mock-note-id';
      const section = {
        id: 'sid',
        type: SectionType.RichText,
        content: '# Loaded',
      };

      effects.openRootNotebook.mockResolvedValue([
        { type: EntityType.Note, id: noteId, title: 'Note #1', sections: [] },
      ]);

      effects.editNote.mockImplementation(async (noteId) => ({
        id: noteId,
        sections: [section],
      }));

      const store = await initializeStore();
      await store.dispatch(actions.editNote(noteId));

      expect(store.getState().sections).toEqual({
        [section.id]: { type: section.type, content: section.content },
      });
    });
  });

  describe('createNote', () => {
    it('adds sections', async () => {
      const section = { id: 'sid', type: SectionType.RichText, content: '' };
      effects.createNote.mockImplementation(async () => ({
        id: uuid(),
        title: 'Untitled',
        sections: [section],
        notebook: NOTEBOOK_ROOT,
      }));

      const store = await initializeStore();
      await store.dispatch(actions.createNote({ notebook: NOTEBOOK_ROOT }));

      expect(store.getState().sections).toEqual({
        [section.id]: {
          type: section.type,
          content: section.content,
        },
      });
    });
  });
});
