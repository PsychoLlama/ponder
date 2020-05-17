import * as fs from 'fs-extra';

import createNotebook from '../create';

jest.mock('fs-extra');

describe('Create notebook', () => {
  beforeEach(() => {
    (fs as any).readFile.mockResolvedValue(
      JSON.stringify({
        title: 'index',
        notebooks: [],
        notes: [],
      })
    );
  });

  it('writes a new notebook', async () => {
    await createNotebook({ notebook: 'index', title: 'no', id: 'id' });

    expect(fs.writeFile).toHaveBeenCalledTimes(2);
  });

  it('skips all writes if the containing notebook is invalid', async () => {
    (fs.readFile as any).mockRejectedValue(
      new Error('Mock: no such notebook error')
    );

    const promise = createNotebook({
      notebook: 'no-such-notebook',
      title: 'something',
      id: 'id',
    });

    await expect(promise).rejects.toBeDefined();
  });

  it('returns the new notebook ID', async () => {
    const id = await createNotebook({
      title: 'New Notebook',
      notebook: 'index',
      id: 'id',
    });

    expect(id).toEqual(expect.any(String));
  });
});
