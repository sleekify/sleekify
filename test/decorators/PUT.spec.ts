import { PUT } from '../../src';
import { ValuedMethodDecoratorSpec } from '../specifications/ValuedMethodDecoratorSpec';

const specification = new ValuedMethodDecoratorSpec(PUT, {
  description: 'First Description'
}, {
  description: 'Second Description'
});

specification.describe(() => {
});
