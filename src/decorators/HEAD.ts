import { Annotation } from './Annotation';
import type { OperationObject } from '../types/types';

/**
 * You may apply this decorator to your resource class's methods to indicate
 * that a method responds to HTTP HEAD requests.  It allows you to annotate
 * the method with an OpenAPI operation object so you can define this
 * operation's documentation.
 *
 * @param operationObject The optional OpenAPI operation object definition
 */
export function HEAD (operationObject?: OperationObject) {
  return function (target: object, context: ClassMethodDecoratorContext): any {
    Annotation.set(target, HEAD, context, operationObject);
  };
};

Annotation.register(HEAD, '678b0aa8-f18b-48d4-9707-373570ed19eb');
