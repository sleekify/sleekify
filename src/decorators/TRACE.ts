import { Annotation } from './Annotation';
import type { OperationObject } from '../types/types';

/**
 * You may apply this decorator to your resource class's methods to indicate
 * that a method responds to HTTP TRACE requests.  It allows you to annotate
 * the method with an OpenAPI operation object so you can define this
 * operation's documentation.
 *
 * @param operationObject The optional OpenAPI operation object definition
 */
export function TRACE (operationObject?: OperationObject) {
  return function (target: object, context: ClassMethodDecoratorContext): any {
    Annotation.set(target, TRACE, context, operationObject);
  };
};

Annotation.register(TRACE, '9d67bbe1-181c-439c-9127-a9629324d137');
