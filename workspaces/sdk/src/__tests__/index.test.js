// @flow
import initializeSdk from '../initialize';
import SDK from '../index';

jest.mock('../directories/list');
jest.mock('../initialize');

describe('SDK', () => {
  it('exports a class', () => {
    expect(SDK).toEqual(expect.any(Function));
  });

  describe('initialize', () => {
    it('initializes and returns an SDK instance', async () => {
      const sdk = await SDK.initialize();

      expect(initializeSdk).toHaveBeenCalled();
      expect(sdk).toEqual(expect.any(SDK));
    });
  });
});
