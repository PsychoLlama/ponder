// @flow
import { compose } from 'redux';
import { NOTEBOOK_ROOT } from '@ponder/sdk';

import createStore, { DEVTOOLS_KEY } from '../redux-store';
import { readNotebook } from '@ponder/sdk';

jest.mock('@ponder/sdk');

describe('Redux store', () => {
  beforeEach(() => {
    delete window[DEVTOOLS_KEY];
    (readNotebook: Function).mockResolvedValue([
      {
        title: 'Note title',
        type: 'note',
        id: 'id',
      },
    ]);
  });

  it('constructs without exploding', async () => {
    await expect(createStore()).resolves.toBeDefined();
  });

  it('returns a redux store', async () => {
    const store = await createStore();

    expect(store.getState()).toBeDefined();
  });

  it('uses the global compose hook if defined', async () => {
    window[DEVTOOLS_KEY] = jest.fn((compose: any));
    await createStore();

    expect(window[DEVTOOLS_KEY]).toHaveBeenCalled();
  });

  it('loads the initial directory', async () => {
    const store = await createStore();
    const { notebooks } = store.getState();

    expect(notebooks).toEqual({
      [NOTEBOOK_ROOT]: {
        contents: [{ type: 'note', id: 'id' }],
        title: '',
      },
    });
  });
});