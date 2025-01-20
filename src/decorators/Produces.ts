import { Annotation } from './Annotation';

/**
 * You may apply this decorator to your resource class or the resource class's
 * methods to provide the default media type for responses.  If this is present
 * on both the class and a class method, then the decorator on the method will
 * have higher precedence.  This decorator should be used with the Schema
 * decorator when your media type is not application/json.  JSON is assumed to
 * be the default media type.
 *
 * @param mediaTypes The supported media types
 */
export function Produces (mediaTypes: string[]) {
  return function (target: object,
    propertyKey?: string,
    _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, Produces, mediaTypes);
  };
};

Annotation.register(Produces, '4e626964-1cc6-4d5c-a20f-bcfd2329cc9b', {
  isAdditive: false
});
