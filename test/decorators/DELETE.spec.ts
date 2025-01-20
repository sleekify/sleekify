import { DELETE } from '../../src';
import { ValuedMethodDecoratorSpec } from '../specifications/ValuedMethodDecoratorSpec';

const specification = new ValuedMethodDecoratorSpec(DELETE, {
  description: 'First Description'
}, {
  description: 'Second Description'
});

specification.describe(() => {
});
