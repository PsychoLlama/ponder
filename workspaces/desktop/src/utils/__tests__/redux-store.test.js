// @flow
import createStore, { DEVTOOLS_KEY } from '../redux-store';

describe('Redux store', () => {
  beforeEach(() => {
    delete window[DEVTOOLS_KEY];
  });

  it('constructs without exploding', () => {
    expect(createStore).not.toThrow();
  });

  it('returns a redux store', () => {
    const store = createStore();

    expect(store.getState()).toBeDefined();
  });

  it('uses the global compose hook if defined', () => {
    window[DEVTOOLS_KEY] = jest.fn();
    createStore();

    expect(window[DEVTOOLS_KEY]).toHaveBeenCalled();
  });
});
