// @flow
import path from 'path';

import { NOTEBOOKS, NOTES } from './vars';

// Pretty-print the JSON with a trailing newline.
export const serialize = <T>(json: T) => JSON.stringify(json, null, 2) + '\n';

export const toNotePath = (id: string) => path.join(NOTES, `${id}.json`);
export const toNotebookPath = (id: string) =>
  path.join(NOTEBOOKS, `${id}.json`);
