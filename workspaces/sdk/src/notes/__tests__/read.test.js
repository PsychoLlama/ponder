// @flow
import fs from 'fs-extra';

import readNote from '../read';

jest.mock('fs-extra');

describe('Note read', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.exists.mockRejectedValue(new Error('Mock: no such note'));
  });

  it('fails if the note does not exist', async () => {
    const promise = readNote('no-such-note');

    await expect(promise).rejects.toBeDefined();
  });

  it('returns the note contents', async () => {
    const contents = { title: 'Note', sections: [] };
    fs.readFile.mockResolvedValue(JSON.stringify(contents));

    const note = await readNote('id');

    expect(note).toEqual(contents);
  });
});
