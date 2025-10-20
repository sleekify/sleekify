import fs from 'node:fs';
import _ from 'lodash';
import path from 'node:path';
import stripJsonComments from 'strip-json-comments';
import { PathUtil } from '../utils/PathUtil';
import { StringUtil } from '../utils/StringUtil';

export interface AnnotationOptions {
  /* is the annotation inherited (default true) */
  isInherited?: boolean
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
      key: decoratorKey,
      isInherited
    } = settings;
    let valueList: any[];

    if (undefined === propertyKey) {
      valueList = Annotation.getValueListForClass(target, decoratorKey, isInherited);
    } else {
      valueList = Annotation.getValueListForProperty(target, propertyKey, decoratorKey, isInherited);
    }

    return valueList.length > 0;
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
      key: decoratorKey,
      isAdditive,
      isInherited
    } = settings;
    let valueList: any[];

    if (undefined === propertyKey) {
      valueList = Annotation.getValueListForClass(target, decoratorKey, isInherited);
    } else {
      valueList = Annotation.getValueListForProperty(target, propertyKey, decoratorKey, isInherited);
    }

    if (valueList.length === 0 || valueList.every(((v: any) => v === EMPTY))) {
      /* no values */
      return;
    }

    if (!_.isObject(valueList[0]) || _.isArray(valueList[0])) {
      /* primitive or array value */
      return valueList[0];
    }

    /* build an object which inherits from parent decorator values */
    const objectValue = {};

    for (const value of valueList) {
      if (_.isObject(value)) {
        _.defaultsDeep(objectValue, value);
      }

      if (!isAdditive) {
        break;
      }
    }

    return objectValue;
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

      if (outDir != null && outDir.length > 0) {
        hasTypesScriptOutDir = true;
      }
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

    if (annotatedDecorator.$annotations === undefined) {
      annotatedDecorator.$annotations = {
        key,
        isInherited: options?.isInherited ?? true,
        isAdditive: options?.isAdditive ?? true
      };
    }
  }

  /**
   * Sets the annotation's value.
   * @param target The class
   * @param propertyKey The property name
   * @param decorator The decorator being used as an annotation
   * @param value The annotation's value
   */
  static set (target: object, propertyKey: string | undefined, decorator: Decorator, value?: any): void {
    const annotatedDecorator: AnnotatedDecorator = decorator;

    if (annotatedDecorator.$annotations === undefined) {
      throw new Error('The annotation has not been registered');
    }

    const decoratorKey = annotatedDecorator.$annotations.key;
    const annotationMap = Annotation.getAnnotationMap(target, propertyKey);

    if (undefined === annotationMap) {
      return;
    }

    annotationMap[decoratorKey] = value ?? EMPTY;
  }

  private static getAnnotationMap (target: object, propertyKey: string | undefined): Record<string, any> | undefined {
    if (undefined === propertyKey) {
      const classReference: any = target;
      const classKey = this.getClassKey(classReference);

      /* class annotation */
      if (undefined === classReference.$annotations) {
        classReference.$annotations = {};
      }

      if (undefined === classReference.$annotations[classKey]) {
        classReference.$annotations[classKey] = {};
      }

      return classReference.$annotations[classKey];
    }

    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const targetValue: any = (target as any)[propertyKey];

    if (undefined !== descriptor && _.isFunction(targetValue)) {
      const classReference: any = target.constructor.name === 'Function' ? target : (target as any).constructor;
      const classKey = this.getClassKey(classReference);

      /* property annotation */
      if (undefined === classReference.$annotations) {
        classReference.$annotations = {};
      }

      if (undefined === classReference.$annotations[classKey]) {
        classReference.$annotations[classKey] = {};
      }

      if (undefined === classReference.$annotations[classKey][propertyKey]) {
        classReference.$annotations[classKey][propertyKey] = {};
      }

      return classReference.$annotations[classKey][propertyKey];
    }

    return undefined;
  }

  private static getClassKey (target: any): number {
    return ClassKeyCache.get(target);
  }

  private static getValueForClass (target: any, decoratorKey: string): any {
    if (undefined === target.$annotations) {
      return undefined;
    }

    const classKey = this.getClassKey(target);

    if (undefined === target.$annotations[classKey]) {
      return undefined;
    }

    return target.$annotations[classKey][decoratorKey];
  }

  private static getValueListForClass (target: any, decoratorKey: string, inherited: boolean): any[] {
    const valueList: any[] = [];

    for (let currentTarget = target; currentTarget !== undefined && currentTarget?.constructor?.name !== 'Object'; currentTarget = Object.getPrototypeOf(currentTarget)) {
      const value = Annotation.getValueForClass(currentTarget, decoratorKey);

      if (value != null) {
        valueList.push(value);
      }

      if (!inherited) {
        break;
      }
    }

    return valueList;
  }

  private static getValueForProperty (target: any, propertyKey: string, decoratorKey: string): any {
    if (undefined === target.$annotations) {
      return undefined;
    }

    const classKey = this.getClassKey(target);

    if (undefined === target.$annotations[classKey]) {
      return undefined;
    }

    if (undefined === target.$annotations[classKey][propertyKey]) {
      return undefined;
    }

    return target.$annotations[classKey][propertyKey][decoratorKey];
  }

  private static getValueListForProperty (target: any, propertyKey: string, decoratorKey: string, inherited: boolean): any[] {
    const valueList: any[] = [];
    let isProperty = false;
    const staticDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const staticTargetValue: any = (target)[propertyKey];

    if (undefined !== staticDescriptor && _.isFunction(staticTargetValue)) {
      /* static property annotation */
      isProperty = true;
    } else {
      const instanceTargetValue: any = target.prototype?.[propertyKey];

      if (_.isFunction(instanceTargetValue)) {
        /* property annotation */
        isProperty = true;
      }
    }

    if (isProperty) {
      for (let currentTarget = target; currentTarget !== undefined && currentTarget?.constructor?.name !== 'Object'; currentTarget = Object.getPrototypeOf(currentTarget)) {
        const value = Annotation.getValueForProperty(currentTarget, propertyKey, decoratorKey);

        if (value != null) {
          valueList.push(value);
        }

        if (!inherited) {
          break;
        }
      }
    }

    return valueList;
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

      if (_.isObject(module)) {
        for (const exportName in module) {
          const exportValue = module[exportName];

          if (_.isObject(exportValue)) {
            if (Annotation.exists(exportValue, undefined, decorator)) {
              classArray.push(exportValue);
            }
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

interface ClassKeyEntry { reference: object, key: number }

/**
 * Class keys are hash codes of the cache definition.  Cache them to improve performance.
 */
class ClassKeyCache {
  private static classNameMap: Record<string, ClassKeyEntry[]> = {};

  /**
   * Get the key for the given class.
   *
   * @param target The class
   * @returns The class key or zero.
   */
  static get (target: object): number {
    const constructorName = (target as any)?.prototype?.constructor?.name;
    let entry: ClassKeyEntry | undefined = {
      reference: target,
      key: 0
    };

    if (constructorName != null) {
      let entryList = ClassKeyCache.classNameMap[constructorName];

      if (entryList === undefined) {
        entryList = [];
        ClassKeyCache.classNameMap[constructorName] = entryList;
      }

      entry = entryList.find((v: ClassKeyEntry) => v.reference === target);

      if (entry === undefined) {
        entry = {
          reference: target,
          key: StringUtil.getHashCode((target as any).toString())
        };

        entryList.push(entry);
      }
    }

    return entry.key;
  }
}
