// @flow
import {
  createNote,
  readNotebook,
  renameNote,
  NOTEBOOK_ROOT,
} from '@ponder/sdk';
import * as actions from '../notebook';

jest.mock('@ponder/sdk');

describe('Notebook actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createNote', () => {
    it('writes a new note', () => {
      actions.createNote({ notebook: NOTEBOOK_ROOT });

      expect(createNote).toHaveBeenCalledWith({
        notebook: NOTEBOOK_ROOT,
        id: expect.any(String),
        title: '',
      });
    });

    it('returns the new note', () => {
      const { payload } = actions.createNote({ notebook: NOTEBOOK_ROOT });

      expect(payload).toMatchObject({
        notebook: NOTEBOOK_ROOT,
        id: expect.any(String),
        title: '',
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
});
