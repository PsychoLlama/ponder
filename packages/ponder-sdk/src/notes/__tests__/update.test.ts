import { toNotePath } from '../../utils';
import { updateAsJson } from '../../fs';
import updateNote from '../update';

jest.mock('../../fs');

describe('Note update', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (updateAsJson as any).mockImplementation(
      (_: any, fn: (...args: any) => any) => {
        fn({ note: true });
        return Promise.resolve();
      }
    );
  });

  it('writes the new result', async () => {
    const fn = () => {};
    await updateNote('id', fn);

    expect(updateAsJson).toHaveBeenCalledWith(toNotePath('id'), fn);
  });

  it('returns a promise', async () => {
    const result = updateNote('id', () => {});

    await expect(result).resolves.toBeUndefined();
  });
});
