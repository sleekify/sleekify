import { Annotation } from './Annotation';
import { type ComponentsObject } from '../types/types';

/**
 * You may apply this decorator to your resource class to annotate the class
 * with reusable OpenAPI components which may be referenced in your OpenAPI
 * specification.  These components include things like path parameters, query
 * parameters, schemas, and headers.  You may provide a path such as
 * "#/components/schemas/Pet" where ever the OpenAPI specification accepts a
 * reference object.
 *
 * Once you define a reusable component with this decorator, that component may
 * be referenced by the same resource class or any of your other resource
 * classes.
 *
 * @param componentsObject The OpenAPI components object definition
 */
export function Components (componentsObject: ComponentsObject): (target: object) => void {
  return function (target: object): void {
    Annotation.set(target, undefined, Components, componentsObject);
  };
};

Annotation.register(Components, 'b7e07cfe-e8c3-46c6-b6c7-6f8c26354d89');
