// @flow
import fs from 'fs-extra';
import path from 'path';

import { NOTEBOOKS, NOTES } from './vars';

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
export const toNotebookPath = (id: string) =>
  path.join(NOTEBOOKS, `${id}.json`);

export const readAsJson = async (filePath: string) => {
  const fileContents = await fs.readFile(filePath, 'utf8');

  return JSON.parse(fileContents);
};
