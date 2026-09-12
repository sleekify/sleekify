import fs from 'node:fs';
import _ from 'lodash';
import path from 'node:path';
import stripJsonComments from 'strip-json-comments';
import { PathUtil } from '../utils/PathUtil';
import '../utils/polyfill';

export interface AnnotationOptions {
  /* does the annotation inherit defaults from the parent (default true) */
  isAdditive?: boolean
};

interface AnnotationSettings extends Required<AnnotationOptions> {
  key: string
};

type Decorator = (...args: any) => any;
type AnnotatedDecorator = Decorator & {
  $annotations?: AnnotationSettings
};

const EMPTY = {};

/**
 * Gets or sets annotations on a class or class property.
 */
export class Annotation {
  constructor () {
    throw new Error('Annotation cannot be instantiated');
  }

  /**
   * Indicates whether the annotation exists on the class or property.
   * @param target The class
   * @param propertyKey The property name
   * @param decorator The decorator associated with the annotation
   * @returns The annotation's value.
   */
  static exists (target: object, propertyKey: string | undefined, decorator: Decorator): boolean {
    const settings = (decorator as AnnotatedDecorator).$annotations;

    if (settings === undefined) {
      return false;
    }

    const {
      key: decoratorKey
    } = settings;

    const decoratorMap = (target as any)[Symbol.metadata]?.[decoratorKey];
    const value = decoratorMap?.[propertyKey ?? ''];

    return value !== undefined;
  }

  /**
   * Gets the annotation's value.
   * @param target The class
   * @param propertyKey The property name
   * @param decorator The decorator associated with the annotation
   * @returns The annotation's value.
   */
  static get (target: object, propertyKey: string | undefined, decorator: Decorator): any {
    const settings = (decorator as AnnotatedDecorator).$annotations;

    if (settings === undefined) {
      return;
    }

    const {
      key: decoratorKey
    } = settings;

    const decoratorMap = (target as any)[Symbol.metadata]?.[decoratorKey];
    const value = decoratorMap?.[propertyKey ?? ''];

    return value !== EMPTY ? value : undefined;
  }

  /**
   * Finds classes annotated with the decoration by searching files recursively
   * under the provided relative path.  The classes must be exported as a named
   * exports since default exports aren't supported.
   *
   * @param relativePath The relative file path to search
   * @param decorator The decorator applied to the class
   */
  static async getClassesAnnotatedWith (relativePath: string, decorator: Decorator): Promise<object[]> {
    const callerFilename = PathUtil.getCallerFilename();
    const callerDirectory = PathUtil.filenameToDirectory(callerFilename);
    const currentDir = process.cwd();
    const tsConfigPath = path.join(currentDir, 'tsconfig.json');
    let isTypeScript = false;
    let hasTypesScriptOutDir = false;

    if (/[.]ts$/.test(callerFilename)) {
      isTypeScript = true;
    }

    if (isTypeScript && fs.existsSync(tsConfigPath)) {
      const contents = fs.readFileSync(tsConfigPath);
      const tsConfig = JSON.parse(stripJsonComments(contents.toString()));
      const outDir = tsConfig.compilerOptions?.outDir;

      hasTypesScriptOutDir = outDir != null && outDir.length > 0;
    }

    let updatedRelativePath = relativePath.replace(/\//g, path.sep);
    let updatedDirectory = callerDirectory;
    const parentDirectoryRegex = new RegExp(`[.][.]\\${path.sep}`);

    while (parentDirectoryRegex.test(updatedRelativePath)) {
      updatedRelativePath = updatedRelativePath.substring(3);
      updatedDirectory = updatedDirectory.substring(0, updatedDirectory.lastIndexOf(path.sep));
    }

    updatedRelativePath = updatedRelativePath.replace(`.${path.sep}`, '');

    const globPath = `${updatedDirectory}${updatedRelativePath !== '' ? `${path.sep}${updatedRelativePath}` : ''}${path.sep}**${path.sep}`.replace(/\\/g, '/');
    const myDirectory = __dirname;
    const commonBasePath = PathUtil.getCommonBasePath(`${currentDir}${path.sep}`, `${myDirectory}${path.sep}`);
    const mySegmentCount = myDirectory.replace(commonBasePath, '').split(path.sep).length;
    const modulePaths = await PathUtil.getModulePaths(globPath, {
      isTypeScript,
      hasTypesScriptOutDir
    });
    const modulePathPrefixSuffix = `${currentDir}${path.sep}`.replace(commonBasePath, '');
    const modulePathPrefix = `${`..${path.sep}`.repeat(mySegmentCount)}${modulePathPrefixSuffix}`;
    const moduleBasePath = `${currentDir}${path.sep}`;

    return await Annotation.importClasses(modulePaths, modulePathPrefix, moduleBasePath, decorator);
  }

  /**
   * Every annotation must be registered with a unique key and its annotation options.
   *
   * @param decorator The decorator being used as an annotation
   * @param key The decorator's unique key
   * @param options The decorator's options (optional)
   */
  static register (decorator: Decorator, key: string, options?: AnnotationOptions): void {
    const annotatedDecorator: AnnotatedDecorator = decorator;

    annotatedDecorator.$annotations = {
      key,
      isAdditive: options?.isAdditive ?? true
    };
  }

  /**
   * Sets the annotation's value.
   * @param target The class
   * @param decorator The decorator being used as an annotation
   * @param context The decorator context
   * @param value The annotation's value
   */
  static set (target: object, decorator: Decorator, context: ClassDecoratorContext | ClassMethodDecoratorContext, value?: any): void {
    const settings = (decorator as AnnotatedDecorator).$annotations;

    if (settings === undefined) {
      throw new Error('The annotation has not been registered');
    }

    const {
      key: decoratorKey,
      isAdditive
    } = settings;

    const decoratorMap: Record<string, any> = context.metadata[decoratorKey] ?? { };
    const propertyKey = context.kind === 'method' ? context.name.toString() : '';
    const existingValue = decoratorMap[propertyKey];
    const resolvedValue = Annotation.getResolvedValue(isAdditive, existingValue, value);

    context.metadata[decoratorKey] = { ...decoratorMap, [propertyKey]: resolvedValue };
  }

  private static getResolvedValue (isAdditive: boolean, existingValue: any, value: any): any {
    let resolvedValue;

    if (isAdditive && existingValue !== EMPTY && (_.isPlainObject(existingValue) || _.isArray(existingValue))) {
      resolvedValue = _.defaultsDeep({
        ...value
      }, existingValue);
    } else {
      resolvedValue = value ?? existingValue ?? EMPTY;
    }

    return resolvedValue;
  }

  private static async importClasses (modulePaths: string[], modulePathPrefix: string, moduleBasePath: string, decorator: Decorator): Promise<object[]> {
    const classArray: object[] = [];
    const promiseArray: Array<Promise<void>> = [];
    const importClassesForModulePath = async (modulePath: string): Promise<void> => {
      const relativeModulePath = `${modulePathPrefix}${modulePath.replace(moduleBasePath, '')}`.replace(/\\/g, '/');

      /* ignore types and tests */
      if (/[.]d[.]ts$/.test(relativeModulePath) || /[.]spec[.][jt]s$/.test(relativeModulePath)) {
        return;
      }

      const module: Record<string, any> = await import(relativeModulePath);

      for (const exportName in module) {
        const exportValue = module[exportName];

        if (_.isObject(exportValue)) {
          if (Annotation.exists(exportValue, undefined, decorator)) {
            classArray.push(exportValue);
          }
        }
      }      
    };

    for (const modulePath of modulePaths) {
      promiseArray.push(importClassesForModulePath(modulePath));
    }

    await Promise.all(promiseArray);

    return classArray;
  }
}
