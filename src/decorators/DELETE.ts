import { Annotation } from './Annotation';
import type { OperationObject } from '../types/types';

/**
 * You may apply this decorator to your resource class's methods to indicate
 * that a method responds to HTTP DELETE requests.  It allows you to annotate
 * the method with an OpenAPI operation object so you can define this
 * operation's documentation.
 *
 * @param operationObject The optional OpenAPI operation object definition
 */
export function DELETE (operationObject?: OperationObject) {
  return function (target: object, context: ClassMethodDecoratorContext): any {
    Annotation.set(target, DELETE, context, operationObject);
  };
};

Annotation.register(DELETE, '329fbd0b-7f1e-4401-9e5b-a84f18875cba');
