// @flow
import * as fs from 'fs-extra';

import { HOME, CONFIG_FILE } from '../vars';
import initialize from '../initialize';

jest.mock('fs-extra');

describe('SDK initializer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.pathExists.mockResolvedValue(false);
  });

  it('returns a promise', async () => {
    const result = initialize();

    expect(result).toEqual(expect.any(Promise));
    await expect(result).resolves.toBeUndefined();
  });

  it('looks for the ponder directory', async () => {
    fs.pathExists.mockResolvedValue(true);
    await initialize();

    expect(fs.pathExists).toHaveBeenCalledWith(HOME);
    expect(fs.mkdir).not.toHaveBeenCalled();
  });

  it('creates the ponder directory if required', async () => {
    await initialize();

    expect(fs.mkdir).toHaveBeenCalledWith(HOME);
  });

  it('creates the ponder config file', async () => {
    await initialize();

    expect(fs.writeFile).toHaveBeenCalledWith(CONFIG_FILE, expect.any(String));
  });
});
