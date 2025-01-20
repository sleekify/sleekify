import { Annotation } from './Annotation';
import { type PathItemObject as Source } from '../types/types';
import _ from 'lodash';

type PathItemObject = {
  path: string
} & Omit<Source, 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put' | 'trace'>;

/**
 * You may apply this decorator to your resource class to annotate the class
 * with a Uniform Resource Identifier (URI) and an optional OpenAPI path item
 * object.  Requests will be directed to your resource class when both the
 * request path matches the URI and the request HTTP method matches an HTTP
 * method decorator applied to one of your class's methods.
 *
 * Your path must be a full relative path which omits the URI's scheme,
 * authority, port, query, and fragment.  You may also include template
 * expressions, delimited by curly braces ({}), to mark that a section of the
 * path is replaceable by a path parameter value.
 *
 * If you provide an OpenAPI path item object to document your resource class,
 * then it must include an extra "path" property to provide the URI.  Your
 * path item object can't include OpenAPI operation objects since that
 * documentation is provided by HTTP method decorators applied to your class's
 * methods.
 *
 * @param pathItemObject The path or an optional OpenAPI path item object definition
 */
export function Path (pathItemObject: string | PathItemObject): (target: object) => void {
  if (_.isString(pathItemObject)) {
    pathItemObject = {
      path: pathItemObject
    };
  }

  if (pathItemObject.path === '') {
    throw new Error(`The Path annotation value of '${pathItemObject.path}' must not be empty`);
  }

  if (pathItemObject.path[0] !== '/') {
    throw new Error(`The Path annotation value of '${pathItemObject.path}' must begin with /`);
  }

  if (pathItemObject.path.length > 1 && pathItemObject.path[pathItemObject.path.length - 1] === '/') {
    throw new Error(`The Path annotation value of '${pathItemObject.path}' must not end with /`);
  }

  return function (target: object): void {
    Annotation.set(target, undefined, Path, pathItemObject);
  };
};

Annotation.register(Path, '5e2bb4eb-7787-477b-b3f0-aa961670af68');
