import * as mockedSdk from '@ponder/sdk';
import * as actions from '../notebook';

jest.mock('@ponder/sdk');

const sdk = mockedSdk as jest.Mocked<typeof mockedSdk>;

describe('Notebook actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createNote', () => {
    it('writes a new note', async () => {
      actions.createNote({ notebook: sdk.NOTEBOOK_ROOT });

      expect(sdk.createNote).toHaveBeenCalledWith({
        notebook: sdk.NOTEBOOK_ROOT,
        id: expect.any(String),
        title: '',
      });

      await Promise.resolve();

      expect(sdk.insertSection).toHaveBeenCalledWith(expect.any(String), 0, {
        type: sdk.SectionType.RichText,
        content: '',
        id: expect.any(String),
      });
    });

    it('returns the new note', () => {
      const { payload } = actions.createNote({ notebook: sdk.NOTEBOOK_ROOT });

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

  describe('renameNote', () => {
    it('renames the note', () => {
      const config = { id: '1', title: 'No' };
      actions.renameNote(config);

      expect(sdk.renameNote).toHaveBeenCalledWith({
        title: config.title,
        id: config.id,
      });
    });

    it('returns the ID and new title', () => {
      const config = { id: '1', title: 'No' };
      const { payload } = actions.renameNote(config);

      expect(payload).toEqual(config);
    });
  });

  describe('openRootNotebook', () => {
    beforeEach(() => {
      sdk.readNotebook.mockResolvedValue([
        {
          type: sdk.EntityType.Notebook,
          id: 'notebook1',
          title: 'Ideas',
        },
        {
          title: 'Recipes',
          type: sdk.EntityType.Note,
          sections: [],
          id: 'note1',
        },
      ]);
    });

    it('returns the notebook listing', async () => {
      const iterator = actions.openRootNotebook();

      await iterator.next();
      const { value: action } = await iterator.next();

      expect(action).toMatchObject({
        payload: expect.any(Array),
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
      const action = actions.editNote(id);

      await expect(action.payload).resolves.toMatchObject({
        sections: [{ mock: 'section' }],
        id,
      });
    });
  });

  describe('updateNoteSection', () => {
    beforeEach(() => {
      sdk.updateSection.mockImplementation(
        <Update extends Function>(
          _note: string,
          _index: number,
          update: Update
        ) => {
          return update({ mock: 'section', content: '' });
        }
      );
    });

    it('updates the section', async () => {
      const config = { noteId: 'note-id', sectionIndex: 1 };
      const action = actions.updateNoteSection(config);

      await expect(action.payload).resolves.toBe(config);

      expect(sdk.updateSection).toHaveBeenCalledWith(
        config.noteId,
        config.sectionIndex,
        expect.any(Function)
      );
    });
  });
});
