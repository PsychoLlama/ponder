// @flow
import path from 'path';

import { NOTEBOOKS, NOTES } from './vars';
import type { JsonValue } from './fs';

// Pretty-print the JSON with a trailing newline.
export const serialize = (json: JsonValue) =>
  JSON.stringify(json, null, 2) + '\n';

export const toNotePath = (id: string) => path.join(NOTES, `${id}.json`);
export const toNotebookPath = (id: string) =>
  path.join(NOTEBOOKS, `${id}.json`);
