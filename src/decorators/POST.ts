import { Annotation } from './Annotation';
import { type OperationObject } from '../types/types';

/**
 * You may apply this decorator to your resource class's methods to indicate
 * that a method responds to HTTP POST requests.  It allows you to annotate
 * the method with an OpenAPI operation object so you can define this
 * operation's documentation.
 *
 * @param operationObject The optional OpenAPI operation object definition
 */
export function POST (operationObject?: OperationObject) {
  return function (target: object,
    propertyKey: string,
    _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, POST, operationObject);
  };
};

Annotation.register(POST, '4dd15507-a6d8-4520-8fe4-d93b3487e000');
