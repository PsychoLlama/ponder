// @flow
import path from 'path';

import { DIRECTORIES, NOTES } from './vars';

type JsonValue =
  | string
  | number
  | boolean
  | Array<JsonValue>
  | { [string]: JsonValue };

// Pretty-print the JSON with a trailing newline.
export const serialize = (json: JsonValue) =>
  JSON.stringify(json, null, 2) + '\n';

export const toNotePath = (id: string) => path.join(NOTES, `${id}.json`);
export const toDirectoryPath = (id: string) =>
  path.join(DIRECTORIES, `${id}.json`);
