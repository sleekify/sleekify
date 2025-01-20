import { PATCH } from '../../src';
import { ValuedMethodDecoratorSpec } from '../specifications/ValuedMethodDecoratorSpec';

const specification = new ValuedMethodDecoratorSpec(PATCH, {
  description: 'First Description'
}, {
  description: 'Second Description'
});

specification.describe(() => {
});
