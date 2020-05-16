// @flow
import fs from 'fs-extra';

import { serialize } from '../utils';
import { readAsJson, writeAsJson, updateAsJson } from '../fs';

jest.mock('fs-extra');

describe('File system', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('readAsJson', () => {
    beforeEach(() => {
      fs.readFile.mockResolvedValue(
        serialize({
          mock: 'file',
        })
      );
    });

    it('rejects if the file does not exist', async () => {
      const error = new Error('Mock: file not found.');
      fs.readFile.mockRejectedValue(error);
      const filePath = 'file-path';

      await expect(readAsJson(filePath)).rejects.toMatchObject(error);
      expect(fs.readFile).toHaveBeenCalledWith(filePath);
    });

    it('resolves with the JSON data', async () => {
      const result = await readAsJson('file');

      expect(result).toEqual({ mock: 'file' });
    });
  });

  describe('writeAsJson', () => {
    beforeEach(() => {
      fs.writeFile.mockResolvedValue();
    });

    it('rejects if the file does not exist', async () => {
      const error = new Error('Mock: file not found.');
      fs.writeFile.mockRejectedValue(error);
      const promise = writeAsJson('file', { data: true });

      await expect(promise).rejects.toMatchObject(error);
      expect(fs.writeFile).toHaveBeenCalledWith(
        'file',
        serialize({ data: true })
      );
    });

    it('resolves with the data', async () => {
      const data = { data: true };
      const result = await writeAsJson('file', data);

      expect(result).toBe(data);
    });
  });

  describe('updateAsJson', () => {
    beforeEach(() => {
      (fs.writeFile: Function).mockResolvedValue();
      (fs.readFile: Function).mockResolvedValue(serialize({ mock: 'file' }));
    });

    it('aborts if the file does not exist', async () => {
      const error = new Error('Mock: file not found.');
      fs.readFile.mockRejectedValue(error);
      const promise = updateAsJson('file', () => {});

      await expect(promise).rejects.toMatchObject(error);
      expect(fs.readFile).toHaveBeenCalledWith('file');
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('writes the file after updating', async () => {
      await updateAsJson('file', () => {});

      expect(fs.writeFile).toHaveBeenCalledWith(
        'file',
        serialize({ mock: 'file' })
      );
    });

    it('applies the update function and write the result', async () => {
      await updateAsJson('file', (file: { mock: string }) => {
        file.mock = 'updated';
      });

      expect(fs.writeFile).toHaveBeenCalledWith(
        'file',
        serialize({ mock: 'updated' })
      );
    });
  });
});
