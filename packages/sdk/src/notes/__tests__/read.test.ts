// @flow
import * as fsModule from 'fs-extra';

import readNote from '../read';

jest.mock('fs-extra');

const fs = fsModule as jest.Mocked<typeof fsModule>;

describe('Note read', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.exists.mockImplementation(() => {
      throw new Error('Mock: no such note');
    });
  });

  it('fails if the note does not exist', async () => {
    const promise = readNote('no-such-note');

    await expect(promise).rejects.toBeDefined();
  });

  it('returns the note contents', async () => {
    const contents = { title: 'Note', sections: [] };
    fs.readFile.mockImplementation(async () =>
      Buffer.from(JSON.stringify(contents))
    );

    const note = await readNote('id');

    expect(note).toEqual(contents);
  });
});
