import { Consumes } from '../../src';
import { ValuedClassAndMethodDecoratorSpec } from '../specifications/ValuedClassAndMethodDecoratorSpec';

const specification = new ValuedClassAndMethodDecoratorSpec(
  Consumes,
  ['application/json'],
  ['application/xml']
);

specification.describe(() => {
});
