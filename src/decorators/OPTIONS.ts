import { Annotation } from './Annotation';
import { type OperationObject } from '../types/types';

/**
 * You may apply this decorator to your resource class's methods to indicate
 * that a method responds to HTTP OPTIONS requests.  It allows you to annotate
 * the method with an OpenAPI operation object so you can define this
 * operation's documentation.
 *
 * @param operationObject The optional OpenAPI operation object definition
 */
export function OPTIONS (operationObject?: OperationObject) {
  return function (target: object,
    propertyKey: string,
    _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, OPTIONS, operationObject);
  };
};

Annotation.register(OPTIONS, '2942a49b-68cf-4469-bcdc-47cd59ac10bc');
