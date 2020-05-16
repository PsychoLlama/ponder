// @flow
import fs from 'fs-extra';

import { serialize } from '../../utils';
import createNote from '../create';

jest.mock('fs-extra');

describe('Create note', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fs.readFile.mockImplementation((path) => {
      if (!/index/.test(path)) {
        throw new Error('Mock: no such notebook');
      }

      return serialize({
        title: 'Root Notebook',
        notebooks: [],
        notes: [],
      });
    });
  });

  it('fails if the notebook does not exist', async () => {
    const promise = createNote({
      notebook: 'no-such-notebook',
      title: 'Title',
      id: 'id',
    });

    await expect(promise).rejects.toBeDefined();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('writes the new note', async () => {
    const id = await createNote({
      notebook: 'index',
      title: 'Title',
      id: 'id',
    });

    expect(fs.writeFile).toHaveBeenCalledTimes(2);
    expect(id).toEqual(expect.any(String));
  });
});
