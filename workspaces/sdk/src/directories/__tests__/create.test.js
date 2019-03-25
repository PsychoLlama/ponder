// @flow
import fs from 'fs-extra';

import createDirectory from '../create';
import readDirectory from '../read';

jest.mock('fs-extra');
jest.mock('../read');

describe('Create directory', () => {
  beforeEach(() => {
    (readDirectory: Function).mockResolvedValue({
      title: 'index',
      directories: [],
      notes: [],
    });
  });

  it('writes a new directory', async () => {
    await createDirectory({ under: 'index', title: 'no' });

    expect(fs.writeFile).toHaveBeenCalledTimes(2);
  });

  it('skips all writes if the containing directory is invalid', async () => {
    (readDirectory: Function).mockRejectedValue(
      new Error('Mock directory error.')
    );

    const promise = createDirectory({
      under: 'no-such-directory',
      title: 'something',
    });

    await expect(promise).rejects.toBeDefined();
  });

  it('returns the new directory ID', async () => {
    const id = await createDirectory({
      under: 'index',
      title: 'New Directory',
    });

    expect(id).toEqual(expect.any(String));
  });
});
