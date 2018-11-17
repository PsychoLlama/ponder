// @flow
import createStore from '../redux-store';

describe('Redux store', () => {
  it('constructs without exploding', () => {
    expect(createStore).not.toThrow();
  });

  it('returns a redux store', () => {
    const store = createStore();

    expect(store.getState()).toBeDefined();
  });
});
