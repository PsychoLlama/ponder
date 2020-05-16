// @flow
import fs from 'fs-extra';

import { serialize } from '../../utils';
import renameNote from '../rename';

jest.mock('fs-extra');

describe('Note rename', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.readFile.mockResolvedValue(
      serialize({
        title: 'Old title',
      })
    );
  });

  it('writes a file', async () => {
    await renameNote({ id: 'a', title: 'New title' });

    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringMatching(/a\.json$/),
      expect.stringContaining('New title')
    );
  });
});
