// @flow
import initialize from './initialize';

export default class SDK {
  static async initialize() {
    await initialize();

    return new SDK();
  }
}
