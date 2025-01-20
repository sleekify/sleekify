import { Annotation } from './Annotation';

/**
 * You may apply this decorator to your resource class or the resource class's
 * methods to provide the default media type for requests.  If this is present
 * on both the class and a class method, then the decorator on the method will
 * have higher precedence.  This decorator should be used with the Schema
 * decorator when your media type is not application/json.  JSON is assumed to
 * be the default media type.
 *
 * @param mediaTypes The supported media types
 */
export function Consumes (mediaTypes: string[]) {
  return function (target: object,
    propertyKey?: string,
    _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, Consumes, mediaTypes);
  };
};

Annotation.register(Consumes, '1ccfbf1a-0676-43e9-873f-3230ed5485c3', {
  isAdditive: false
});
