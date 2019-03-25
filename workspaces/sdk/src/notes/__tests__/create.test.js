// @flow
import fs from 'fs-extra';

import { serialize } from '../../utils';
import createNote from '../create';

jest.mock('fs-extra');

describe('Create note', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fs.readFile.mockImplementation(path => {
      if (!/index/.test(path)) {
        throw new Error('Mock: no such directory');
      }

      return serialize({
        title: 'Root directory',
        directories: [],
        notes: [],
      });
    });
  });

  it('fails if the directory does not exist', async () => {
    const promise = createNote({ title: 'Title', directory: 'no-such-dir' });

    await expect(promise).rejects.toBeDefined();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('writes the new note', async () => {
    const id = await createNote({ title: 'Title', directory: 'index' });

    expect(fs.writeFile).toHaveBeenCalledTimes(2);
    expect(id).toEqual(expect.any(String));
  });
});
