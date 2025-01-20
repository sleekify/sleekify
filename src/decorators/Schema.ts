import { Annotation } from './Annotation';
import { type SchemaObject } from '../types/types';

/**
 * You may apply this decorator to your resource class or the resource class's
 * methods to provide the default schema object for requests and responses.  If
 * this is present on both the class and a class method, then the decorator on
 * the method will have higher precedence.
 *
 * @param schemaObject The optional OpenAPI schema object definition
 */
export function Schema (schemaObject?: SchemaObject) {
  return function (target: object,
    propertyKey?: string,
    _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, Schema, schemaObject);
  };
};

Annotation.register(Schema, '633be8e8-2058-44f0-bf9a-379be0856b0d');
