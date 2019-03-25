// @flow
import createDirectory from './directories/create';
import readDirectory from './directories/list';
import initialize from './initialize';
import readNote from './notes/read';

export default class SDK {
  static async initialize() {
    await initialize();

    return new SDK();
  }

  createDirectory = createDirectory;
  readDirectory = readDirectory;
  readNote = readNote;
}
