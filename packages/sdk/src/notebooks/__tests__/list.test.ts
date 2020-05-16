// @flow
import * as fs from 'fs-extra';
import { basename } from 'path';

import list from '../list';
import { Notebook, Note } from '../../types';
import { EntityType } from '../../public-types';

jest.mock('fs-extra');

describe('Notebook listing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fs as any).pathExists.mockResolvedValue(true);

    const dirs: { [filePath: string]: Notebook } = {
      'index.json': {
        title: 'Zeroeth',
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

    const notes: { [filePath: string]: Note } = {
      'note1.json': {
        title: 'Note',
        sections: [],
      },
    };

    (fs as any).readFile.mockImplementation(async (filePath: string) => {
      const filename = basename(filePath);

      const map = /notes/.test(filePath) ? notes : dirs;
      if (!map.hasOwnProperty(filename)) {
        throw new Error(`No mock for file "${filePath}".`);
      }

      return JSON.stringify(map[filename], null, 2);
    });
  });

  it('fails if the notebook does not exist', async () => {
    (fs as any).pathExists.mockResolvedValue(false);
    const id = 'non-existent-file';

    await expect(list(id)).rejects.toMatchObject({
      message: expect.stringMatching(/exist/i),
    });
  });

  it('lists all the notebooks', async () => {
    const results = await list('index');

    expect(results).toEqual([
      {
        type: EntityType.Notebook,
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
        type: EntityType.Note,
        title: 'Note',
        id: 'note1',
        sections: [],
      },
    ]);
  });
});
