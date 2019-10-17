// @flow
import produce, { nothing } from 'immer';
import fs from 'fs-extra';

import { serialize } from './utils';

export type JsonValue =
  | string
  | number
  | boolean
  | Array<JsonValue>
  | { [string]: JsonValue };

export const readAsJson = async (filePath: string) => {
  const contents = await fs.readFile(filePath);

  return JSON.parse(contents);
};

export const writeAsJson = async (filePath: string, data: JsonValue) => {
  const fileContents = serialize(data);
  await fs.writeFile(filePath, fileContents);

  return data;
};

export const updateAsJson = async <State>(
  filePath: string,
  producer: State => void | typeof nothing
) => {
  const data = await readAsJson(filePath);
  const changes = produce(data, producer);
  await writeAsJson(filePath, changes);
};
