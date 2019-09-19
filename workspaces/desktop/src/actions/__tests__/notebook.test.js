// @flow
import {
  insertSection,
  createNote,
  readNotebook,
  renameNote,
  readNote,
  NOTEBOOK_ROOT,
} from '@ponder/sdk';
import * as actions from '../notebook';

jest.mock('@ponder/sdk');

describe('Notebook actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createNote', () => {
    it('writes a new note', async () => {
      actions.createNote({ notebook: NOTEBOOK_ROOT });

      expect(createNote).toHaveBeenCalledWith({
        notebook: NOTEBOOK_ROOT,
        id: expect.any(String),
        title: '',
      });

      await Promise.resolve();

      expect(insertSection).toHaveBeenCalledWith(expect.any(String), 0, {
        type: 'markdown',
        content: '',
        id: expect.any(String),
      });
    });

    it('returns the new note', () => {
      const { payload } = actions.createNote({ notebook: NOTEBOOK_ROOT });

      expect(payload).toMatchObject({
        notebook: NOTEBOOK_ROOT,
        id: expect.any(String),
        title: '',
        sections: [
          {
            type: 'markdown',
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

      expect(renameNote).toHaveBeenCalledWith({
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
      (readNotebook: Function).mockResolvedValue([
        {
          type: 'notebook',
          id: 'notebook1',
          title: 'Ideas',
        },
        {
          title: 'Recipes',
          type: 'note',
          id: 'note1',
        },
      ]);
    });

    it('returns the notebook listing', async () => {
      const { payload } = actions.openRootNotebook();

      await expect(payload).resolves.toHaveLength(2);
    });
  });

  describe('editNote', () => {
    beforeEach(() => {
      readNote.mockImplementation(id => ({
        sections: [{ mock: 'section' }],
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
});
