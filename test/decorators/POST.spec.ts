import { POST } from '../../src';
import { ValuedMethodDecoratorSpec } from '../specifications/ValuedMethodDecoratorSpec';

const specification = new ValuedMethodDecoratorSpec(POST, {
  description: 'First Description'
}, {
  description: 'Second Description'
});

specification.describe(() => {
});
