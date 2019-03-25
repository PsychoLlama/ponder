// @flow
import readDirectory from './directories/list';
import initialize from './initialize';

export default class SDK {
  static async initialize() {
    await initialize();

    return new SDK();
  }

  readDirectory(id: string) {
    return readDirectory(id);
  }
}
