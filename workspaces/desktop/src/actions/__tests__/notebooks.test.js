// @flow
import { createNote, NOTEBOOK_ROOT } from '@ponder/sdk';
import * as actions from '../notebooks';

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
});
