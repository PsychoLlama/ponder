// @flow
import path from 'path';
import os from 'os';

export const HOME = path.join(os.homedir(), '.ponder');
export const CONFIG_FILE = path.join(HOME, 'config.json');
export const NOTEBOOKS = path.join(HOME, 'notebooks');
export const NOTES = path.join(HOME, 'notes');
export const ROOT_DIR = 'index';
