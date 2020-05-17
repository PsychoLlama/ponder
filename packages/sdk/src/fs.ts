import produce, { nothing } from 'immer';
import fs from 'fs-extra';

import { serialize } from './utils';

export const readAsJson = async <Expected>(
  filePath: string
): Promise<Expected> => {
  const contents = await fs.readFile(filePath, 'utf8');

  return JSON.parse(contents);
};

export const writeAsJson = async <Data>(filePath: string, data: Data) => {
  const fileContents = serialize(data);
  await fs.writeFile(filePath, fileContents);

  return data;
};

export const updateAsJson = async <State>(
  filePath: string,
  producer: (state: State) => void | typeof nothing
) => {
  const data = await readAsJson(filePath);
  const changes = produce(data, producer);
  await writeAsJson(filePath, changes);
};
