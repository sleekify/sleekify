import { Path } from '../../src';
import { ValuedClassDecoratorSpec } from '../specifications/ValuedClassDecoratorSpec';

const specification = new ValuedClassDecoratorSpec(Path, {
  path: '/users'
}, {
  path: '/orders'
});

specification.describe(() => {
  [
    {
      description: 'cannot be empty',
      path: '',
      error: new Error("The Path annotation value of '' must not be empty")
    },
    {
      description: 'must start with /',
      path: 'abc/def',
      error: new Error("The Path annotation value of 'abc/def' must begin with /")
    },
    {
      description: 'must not end with /',
      path: '/abc/',
      error: new Error("The Path annotation value of '/abc/' must not end with /")
    }
  ].forEach(test => {
    it(`When applied to a class, the path value ${test.description}`, () => {
      try {
        @Path(test.path)
        class TargetClass {
        }
        new TargetClass();
        throw new Error('No Error!');
      } catch (e: unknown) {
        expect(e).toStrictEqual(test.error);
      }

      try {
        @Path({
          path: test.path
        })
        class TargetClass {
        }
        new TargetClass();
        throw new Error('No Error!');
      } catch (e: unknown) {
        expect(e).toStrictEqual(test.error);
      }
    });
  });
});
