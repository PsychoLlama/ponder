// @flow
import createNotebook from './notebooks/create';
import readNotebook from './notebooks/list';
import createNote from './notes/create';
import initialize from './initialize';
import readNote from './notes/read';

export default class SDK {
  static async initialize() {
    await initialize();

    return new SDK();
  }

  createNotebook = createNotebook;
  readNotebook = readNotebook;
  createNote = createNote;
  readNote = readNote;
}
