import path from 'node:path';
import { PathUtil } from '../../src/utils/PathUtil';

describe('PathUtil', () => {
  it('When extracting the directory from a valid filename, the directory is returned', () => {
    const result = PathUtil.filenameToDirectory(`${path.sep}directory${path.sep}filename.ts`);

    expect(result).toBe(`${path.sep}directory`);
  });

  it('When extracting the directory from an invalid filename, an error is thrown', () => {
    expect(() => PathUtil.filenameToDirectory('filename.ts')).toThrow(
      new Error("The filename path of 'filename.ts' is invalid")
    );
  });

  it('When getting the caller filename, then the filename is returned', () => {
    const result = PathUtil.getCallerFilename();

    expect(result.startsWith(`${process.cwd()}${path.sep}node_modules${path.sep}`)).toBe(true);
  });

  it('When getting the caller filename and the stack is missing, an error is thrown', () => {
    const fakedError: Error = { name: 'Error', message: 'Fake error!', stack: undefined };
    const expectedError = new Error('Cannot determine the caller filename when the error stack is missing');

    jest.spyOn(global, 'Error').mockReturnValueOnce(fakedError);

    expect(() => PathUtil.getCallerFilename()).toThrow(expectedError);
  });

  it('When getting the caller filename and the stack is empty, an error is thrown', () => {
    const fakedError: Error = { name: 'Error', message: 'Fake error!', stack: '' };
    const expectedError = new Error('Cannot determine the caller filename when the error stack is malformed');

    jest.spyOn(global, 'Error').mockReturnValueOnce(fakedError);

    expect(() => PathUtil.getCallerFilename()).toThrow(expectedError);
  });

  it('When determining the common base path, the shared path is returned', () => {
    const path1 = `${path.sep}abc${path.sep}def${path.sep}ghi`;
    const path2 = `${path.sep}abc${path.sep}def${path.sep}xyz`;
    const result = PathUtil.getCommonBasePath(path1, path2);

    expect(result).toBe(`${path.sep}abc${path.sep}def${path.sep}`);
  });

  it('When determining the common base path when the 1st path segment is similar, the shared path is returned', () => {
    const path1 = `${path.sep}abc${path.sep}def${path.sep}ghi`;
    const path2 = `${path.sep}abc2${path.sep}def${path.sep}xyz`;
    const result = PathUtil.getCommonBasePath(path1, path2);

    expect(result).toBe(`${path.sep}`);
  });

  it('When determining the common base path when the 2nd path segment is similar, the shared path is returned', () => {
    const path1 = `${path.sep}abc${path.sep}def${path.sep}ghi`;
    const path2 = `${path.sep}abc${path.sep}defs${path.sep}xyz`;
    const result = PathUtil.getCommonBasePath(path1, path2);

    expect(result).toBe(`${path.sep}abc${path.sep}`);
  });

  it('When determining the common base path without path separators (not realistic), the shared path is returned', () => {
    const path1 = 'abc';
    const path2 = 'defs';
    const result = PathUtil.getCommonBasePath(path1, path2);

    expect(result).toBe('');
  });

  it('When searching for JavaScript module paths, then the expected results are returned', async () => {
    const globPath = `${__dirname.replace(/\\/g, '/')}/data/**/`;
    const modulePaths = await PathUtil.getModulePaths(globPath, {
      isTypeScript: false,
      hasTypesScriptOutDir: false
    });

    expect(modulePaths.length).toBe(2);
    expect(modulePaths.includes(`${__dirname}${path.sep}data${path.sep}other.js`)).toBe(true);
    expect(modulePaths.includes(`${__dirname}${path.sep}data${path.sep}test.js`)).toBe(true);
  });

  it('When searching for TypeScript (inline) module paths, then the expected results are returned', async () => {
    const globPath = `${__dirname.replace(/\\/g, '/')}/data/**/`;
    const modulePaths = await PathUtil.getModulePaths(globPath, {
      isTypeScript: true,
      hasTypesScriptOutDir: false
    });

    expect(modulePaths.length).toBe(2);
    expect(modulePaths.includes(`${__dirname}${path.sep}data${path.sep}other.js`)).toBe(true);
    expect(modulePaths.includes(`${__dirname}${path.sep}data${path.sep}test.ts`)).toBe(true);
  });

  it('When searching for TypeScript (separate) module paths, then the expected results are returned', async () => {
    const globPath = `${__dirname.replace(/\\/g, '/')}/data/**/`;
    const modulePaths = await PathUtil.getModulePaths(globPath, {
      isTypeScript: true,
      hasTypesScriptOutDir: true
    });

    expect(modulePaths.length).toBe(3);
    expect(modulePaths.includes(`${__dirname}${path.sep}data${path.sep}other.js`)).toBe(true);
    expect(modulePaths.includes(`${__dirname}${path.sep}data${path.sep}test.js`)).toBe(true);
    expect(modulePaths.includes(`${__dirname}${path.sep}data${path.sep}test.ts`)).toBe(true);
  });
});
