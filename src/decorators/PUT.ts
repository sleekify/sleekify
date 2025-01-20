import { Annotation } from './Annotation';
import { type OperationObject } from '../types/types';

/**
 * You may apply this decorator to your resource class's methods to indicate
 * that a method responds to HTTP PUT requests.  It allows you to annotate
 * the method with an OpenAPI operation object so you can define this
 * operation's documentation.
 *
 * @param operationObject The optional OpenAPI operation object definition
 */
export function PUT (operationObject?: OperationObject) {
  return function (target: object,
    propertyKey: string,
    _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, PUT, operationObject);
  };
};

Annotation.register(PUT, '6f16d42e-2294-4b88-87ea-928dd68c4713');
