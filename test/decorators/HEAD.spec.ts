import { HEAD } from '../../src';
import { ValuedMethodDecoratorSpec } from '../specifications/ValuedMethodDecoratorSpec';

const specification = new ValuedMethodDecoratorSpec(HEAD, {
  description: 'First Description'
}, {
  description: 'Second Description'
});

specification.describe(() => {
});
