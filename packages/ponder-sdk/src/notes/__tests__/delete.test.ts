import * as fsModule from 'fs-extra';

import * as fsUtilsModule from '../../fs';
import deleteNote from '../delete';
import { toNotePath } from '../../utils';

jest.mock('fs-extra');
jest.mock('../../fs');

const fs = fsModule as jest.Mocked<typeof fsModule>;
const fsUtils = fsUtilsModule as jest.Mocked<typeof fsUtilsModule>;

describe('Note delete', () => {
  it('deletes the note', async () => {
    await deleteNote({ noteId: 'note-id', notebookId: 'notebook-id' });

    expect(fs.unlink).toHaveBeenCalledWith(toNotePath('note-id'));
  });

  it('removes the note from the notebook', async () => {
    const notebook = { notes: ['note-1', 'note-2', 'note-3'] };
    fsUtils.updateAsJson.mockImplementation(async (_: string, update: any) => {
      update(notebook);
    });

    await deleteNote({ noteId: 'note-2', notebookId: 'notebook-id' });

    expect(notebook.notes).toEqual(['note-1', 'note-3']);
  });
});
