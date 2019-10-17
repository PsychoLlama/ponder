// @flow
import fs from 'fs-extra';
import path from 'path';

import list, { TYPES } from '../list';

jest.mock('fs-extra');

describe('Notebook listing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.exists.mockResolvedValue(true);

    const dirs = {
      'index.json': {
        notebooks: ['dir1'],
        notes: [],
      },
      'dir1.json': {
        title: 'First',
        notebooks: ['dir2', 'dir3'],
        notes: ['note1'],
      },
      'dir2.json': {
        title: 'Second',
        notebooks: [],
        notes: [],
      },
      'dir3.json': {
        title: 'Third',
        notebooks: [],
        notes: [],
      },
    };

    const notes = {
      'note1.json': {
        title: 'Note',
      },
    };

    fs.readFile.mockImplementation(async filePath => {
      const filename = path.basename(filePath);

      const map = /notes/.test(filePath) ? notes : dirs;
      if (!map.hasOwnProperty(filename)) {
        throw new Error(`No mock for file "${filePath}".`);
      }

      return JSON.stringify(map[filename], null, 2);
    });
  });

  it('fails if the notebook does not exist', async () => {
    fs.exists.mockResolvedValue(false);
    const id = 'non-existent-file';

    await expect(list(id)).rejects.toMatchObject({
      message: expect.stringMatching(/exist/i),
    });
  });

  it('lists all the notebooks', async () => {
    const results = await list('index');

    expect(results).toEqual([
      {
        type: TYPES.NOTEBOOK,
        title: 'First',
        id: 'dir1',
      },
    ]);
  });

  it('includes notes in the notebook lookup', async () => {
    const results = await list('dir1');

    expect(results).toEqual([
      expect.objectContaining({
        title: 'Second',
      }),
      expect.objectContaining({
        title: 'Third',
      }),
      {
        type: TYPES.NOTE,
        title: 'Note',
        id: 'note1',
      },
    ]);
  });
});
