// @flow
import fs from 'fs-extra';

import createNotebook from '../create';

jest.mock('fs-extra');

describe('Create notebook', () => {
  beforeEach(() => {
    fs.readFile.mockResolvedValue(
      JSON.stringify({
        title: 'index',
        notebooks: [],
        notes: [],
      })
    );
  });

  it('writes a new notebook', async () => {
    await createNotebook({ under: 'index', title: 'no' });

    expect(fs.writeFile).toHaveBeenCalledTimes(2);
  });

  it('skips all writes if the containing notebook is invalid', async () => {
    (fs.readFile: Function).mockRejectedValue(
      new Error('Mock: no such notebook error')
    );

    const promise = createNotebook({
      under: 'no-such-notebook',
      title: 'something',
    });

    await expect(promise).rejects.toBeDefined();
  });

  it('returns the new notebook ID', async () => {
    const id = await createNotebook({
      under: 'index',
      title: 'New Notebook',
    });

    expect(id).toEqual(expect.any(String));
  });
});
