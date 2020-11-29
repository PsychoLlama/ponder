import * as mockedSdk from '@ponder/sdk';
import * as effects from '../notebook';

jest.mock('@ponder/sdk');

const sdk = mockedSdk as jest.Mocked<typeof mockedSdk>;

describe('Notebook effects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('openRootNotebook', () => {
    beforeEach(() => {
      sdk.readNotebook.mockResolvedValue([]);
    });

    it('opens the root notebook', async () => {
      await expect(effects.openRootNotebook()).resolves.toEqual([]);
      expect(sdk.readNotebook).toHaveBeenCalledWith(sdk.NOTEBOOK_ROOT);
    });
  });

  describe('createNote', () => {
    it('writes a new note', async () => {
      await effects.createNote({ notebook: sdk.NOTEBOOK_ROOT });

      expect(sdk.createNote).toHaveBeenCalledWith({
        notebook: sdk.NOTEBOOK_ROOT,
        id: expect.any(String),
        title: '',
      });

      expect(sdk.insertSection).toHaveBeenCalledWith(expect.any(String), 0, {
        type: sdk.SectionType.RichText,
        content: '',
        id: expect.any(String),
      });
    });

    it('returns the new note', async () => {
      const payload = await effects.createNote({ notebook: sdk.NOTEBOOK_ROOT });

      expect(payload).toMatchObject({
        notebook: sdk.NOTEBOOK_ROOT,
        id: expect.any(String),
        title: '',
        sections: [
          {
            type: sdk.SectionType.RichText,
            content: '',
            id: expect.any(String),
          },
        ],
      });
    });
  });

  describe('editNote', () => {
    beforeEach(() => {
      sdk.readNote.mockImplementation(async (id: string) => ({
        type: sdk.EntityType.Note,
        sections: [{ mock: 'section' } as any],
        title: 'title',
        id,
      }));
    });

    it('reads the given note', async () => {
      const id = 'note-id';

      await expect(effects.editNote(id)).resolves.toMatchObject({
        sections: [{ mock: 'section' }],
        id,
      });
    });
  });

  describe('updateNoteSection', () => {
    beforeEach(() => {
      sdk.updateSection.mockImplementation(
        <Update extends (...args: any) => any>(
          _note: string,
          _index: number,
          update: Update
        ) => {
          return update({ mock: 'section', content: '' });
        }
      );
    });

    it('updates the section', async () => {
      const config = { noteId: 'note-id', sectionIndex: 1, content: '' };

      await expect(effects.updateNoteSection(config)).resolves.toBe(config);

      expect(sdk.updateSection).toHaveBeenCalledWith(
        config.noteId,
        config.sectionIndex,
        expect.any(Function)
      );
    });
  });
});
