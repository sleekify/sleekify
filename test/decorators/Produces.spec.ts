import { Produces } from '../../src';
import { ValuedClassAndMethodDecoratorSpec } from '../specifications/ValuedClassAndMethodDecoratorSpec';

const specification = new ValuedClassAndMethodDecoratorSpec(
  Produces,
  ['application/json'],
  ['application/xml']
);

specification.describe(() => {
});
