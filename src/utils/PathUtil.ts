import { glob } from 'glob';
import path from 'node:path';

export class PathUtil {
  static filenameToDirectory (filename: string): string {
    const separatorIndex = filename.lastIndexOf(path.sep);

    if (separatorIndex < 0) {
      throw new Error(`The filename path of '${filename}' is invalid`);
    }

    return filename.substring(0, separatorIndex);
  }

  static getCallerFilename (): string {
    const stack = new Error().stack;

    if (stack == null) {
      throw new Error('Cannot determine the caller filename when the error stack is missing');
    }

    const line = stack.split('\n')[3] ?? '';
    const startIndex = line.indexOf('(') + 1;
    const endIndex = line.search(/:\d+:\d+\)$/);

    if (startIndex <= 0 || endIndex < 0 || startIndex > endIndex) {
      throw new Error('Cannot determine the caller filename when the error stack is malformed');
    }

    return line.substring(startIndex, endIndex);
  }

  static getCommonBasePath (path1: string, path2: string): string {
    const minLength = Math.min(path1.length, path2.length);
    let charIndex = 0;

    for (; charIndex < minLength; charIndex++) {
      if (path1.charAt(charIndex) !== path2.charAt(charIndex)) {
        break;
      }
    }

    const matchingPrefix = path1.substring(0, charIndex);
    const pathSepIndex = matchingPrefix.lastIndexOf(path.sep);
    const commonBasePath = pathSepIndex >= 0 ? matchingPrefix.substring(0, pathSepIndex + 1) : matchingPrefix;

    return commonBasePath;
  }

  static async getModulePaths (globPath: string, options?: { isTypeScript: boolean, hasTypesScriptOutDir: boolean }): Promise<string[]> {
    let modulePaths;

    if (options?.isTypeScript === true) {
      if (options?.hasTypesScriptOutDir) {
        modulePaths = await glob(`${globPath}*(*.js|*.ts)`);
      } else {
        const tsModulePaths = await glob(`${globPath}*.ts`);
        const jsModulePaths = await glob(`${globPath}*.js`);
        const pathMap: Record<string, true> = {};

        for (const tsPath of tsModulePaths) {
          pathMap[tsPath.slice(0, -3)] = true;
        }

        modulePaths = [...tsModulePaths];

        for (const jsPath of jsModulePaths) {
          if (!pathMap[jsPath.slice(0, -3)]) {
            modulePaths.push(jsPath);
          }
        }
      }
    } else {
      modulePaths = await glob(`${globPath}*.js`);
    }

    return modulePaths.sort();
  }
}
