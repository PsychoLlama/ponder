// @flow
import readDirectory from '../directories/list';
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

  describe('readDirectory', () => {
    it('calls through to the implementation', async () => {
      const sdk = new SDK();

      await sdk.readDirectory('id');

      expect(readDirectory).toHaveBeenCalledWith('id');
    });
  });
});
